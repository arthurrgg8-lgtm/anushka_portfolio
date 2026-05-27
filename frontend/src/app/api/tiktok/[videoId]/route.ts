import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;

  try {
    // Use TikTok's oEmbed API to get video metadata
    const oembedUrl = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@himalayanmastiffnepal/video/${videoId}`;
    const res = await fetch(oembedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BhoteyKukur/1.0)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`oEmbed returned ${res.status}`);

    const data = await res.json();

    return NextResponse.json({
      type: "embed" as const,
      url: `https://www.tiktok.com/@himalayanmastiffnepal/video/${videoId}`,
      thumbnail: data.thumbnail_url || data.thumbnail || null,
    });
  } catch {
    // Graceful fallback — embed type with TikTok link, no thumbnail
    return NextResponse.json({
      type: "embed" as const,
      url: `https://www.tiktok.com/@himalayanmastiffnepal/video/${videoId}`,
      thumbnail: null,
    });
  }
}
