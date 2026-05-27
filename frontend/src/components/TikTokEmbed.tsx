"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TikTokEmbedProps {
  videoId: string;
  muted?: boolean;
}

interface VideoResult {
  type: "direct" | "embed";
  url: string;
  thumbnail?: string;
}

export default function TikTokEmbed({ videoId, muted = true }: TikTokEmbedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [playing, setPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const retryCount = useRef(0);
  const MAX_RETRIES = 2;

  const fetchVideoUrl = useCallback(async () => {
    setState("loading");
    setResult(null);
    try {
      const res = await fetch(`/api/tiktok/${videoId}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.url && data.type) {
        setResult({ type: data.type, url: data.url, thumbnail: data.thumbnail });
        // For embed type, mark as ready immediately — thumbnail loads independently
        if (data.type === "embed") {
          setState("ready");
        }
      } else {
        throw new Error("No URL");
      }
    } catch {
      setState("error");
    }
  }, [videoId]);

  useEffect(() => {
    fetchVideoUrl();
  }, [fetchVideoUrl]);

  const handleVideoError = useCallback(() => {
    if (retryCount.current >= MAX_RETRIES) {
      setState("error");
      return;
    }
    retryCount.current += 1;
    fetchVideoUrl();
  }, [fetchVideoUrl]);


  // Error state — clickable link to TikTok
  if (state === "error") {
    return (
      <a
        href={`https://www.tiktok.com/@himalayanmastiffnepal/video/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="aspect-[9/16] w-full rounded-lg bg-gradient-to-b from-primary-light via-accent/5 to-primary flex items-center justify-center border border-border group"
      >
        <div className="flex flex-col items-center gap-2 text-text-muted group-hover:text-secondary transition-colors">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.84.11v-3.5a6.37 6.37 0 00-.84-.05A6.33 6.33 0 004.58 15.2a6.33 6.33 0 006.33 6.33 6.33 6.33 0 006.33-6.33V9.77a8.03 8.03 0 004.67 1.52v-3.5a4.6 4.6 0 01-3.32-1.1z" />
          </svg>
          <span className="text-xs">View on TikTok</span>
        </div>
      </a>
    );
  }

  return (
    <div className="relative w-full">
      {/* Loading state */}
      {state === "loading" && (
        <div className="aspect-[9/16] w-full rounded-lg bg-gradient-to-b from-primary-light via-accent/5 to-primary flex items-center justify-center border border-border">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-secondary/30 border-t-secondary animate-spin" />
            <p className="text-[10px] text-text-muted">Loading...</p>
          </div>
        </div>
      )}

      {/* Direct MP4 — native video, loops, no TikTok UI */}
      {result?.type === "direct" && (
        <div className="relative">
          <video
            ref={videoRef}
            src={result.url}
            className={`w-full aspect-[9/16] rounded-lg object-cover bg-black ${
              state === "ready" ? "block" : "hidden"
            }`}
            autoPlay
            loop
            playsInline
            {...(muted ? { muted: true } : {})}
            preload="auto"
            controls={false}
            onCanPlay={() => setState("ready")}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={handleVideoError}
          />

          {/* Subtle play overlay — only shows if autoplay blocked */}
          {state === "ready" && !playing && (
            <button
              onClick={() => {
                videoRef.current?.play().catch(() => {});
              }}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              aria-label="Play video"
            >
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110">
                <svg className="h-5 w-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Embed — thumbnail first, then TikTok player on play */}
      {result?.type === "embed" && (
        <>
          {!showPlayer ? (
            <button
              onClick={() => setShowPlayer(true)}
              className="relative block w-full aspect-[9/16] rounded-lg bg-gradient-to-b from-primary-light via-accent/5 to-primary overflow-hidden group cursor-pointer text-left"
            >
              {result.thumbnail && (
                <img
                  src={result.thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 bg-primary/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="h-14 w-14 rounded-full bg-secondary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xl">
                  <svg className="h-6 w-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-white/90 bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  Play Video
                </span>
              </div>
              <div className="absolute top-3 left-3 text-white/60">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.84.11v-3.5a6.37 6.37 0 00-.84-.05A6.33 6.33 0 004.58 15.2a6.33 6.33 0 006.33 6.33 6.33 6.33 0 006.33-6.33V9.77a8.03 8.03 0 004.67 1.52v-3.5a4.6 4.6 0 01-3.32-1.1z" />
                </svg>
              </div>
            </button>
          ) : (
            <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-black">
              <iframe
                src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=1&loop=1&rel=0${muted ? '&muted=1' : ''}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="TikTok video"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
