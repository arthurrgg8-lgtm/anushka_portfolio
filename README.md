# Ar. Anushka Khatri — Spatial & Architectural Portfolio

An elite, highly immersive vertical scroll-snapping vernacular and modern architectural portfolio website crafted for **Ar. Anushka Khatri**. The design combines modern minimalist layout principles with traditional Nepalese architectural heritage, utilizing an **Earth & Concrete** visual palette.

[![Live Site](https://img.shields.io/badge/Live%20Demo-anushkakhatri.vercel.app-C85A32?style=for-the-badge&logo=vercel)](https://anushkakhatri.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Next.js%2016-React%2019-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Styling](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🎨 Visual System & Aesthetic Language

The portfolio is drafted around a custom-built, multi-layered **architectural watermark drafting sheet** theme that replicates a professional tracing table background:

*   **Earth & Concrete Palette**: Mapped switchable HSL color tokens for Light mode (Lokta Paper `#FDFBF7` & clay terracotta accents `#C85A32`) and Dark mode (Obsidian `#121316` & burnt sienna `#D16C45`).
*   **Tactile Dot Grid & Guidelines**: A fine $24\text{px}$ terracotta dot grid (`--grid-dot`) combined with $120\text{px}$ drafting grid lines (`--grid-line`) optimized for balanced contrast and readability.
*   **Drafting Details & Technical Annotations**: Inset margin frame outlines featuring realistic L-shaped crop marks, ruler scale measurements, and monospaced sheet references:
    *   *Top-Left*: `PROJECT: PORTFOLIO // AR. ANUSHKA KHATRI // KATHMANDU, NEPAL`
    *   *Top-Right*: `SHEET REF: A-001 // REG: NEC-94879 // 27°42'N 85°19'E` *(Verifying her Nepal Engineering Council professional credentials: **NEC REG NO: 94879**)*.
*   **Faded Vector Blueprints**: Background layers embed details of a traditional Nepalese Sal Wood *Newari Lattice Window* (`DWG: DETAIL-04`) and a structural tension panel joinery layout with annotated leader lines.

---

## ✨ Immersive Interactive Features

### 1. Vertical Scroll Snapping (TikTok Layout Metaphor)
The core layout uses CSS snapping bounds (`snap-y snap-mandatory`). Viewport-height pages flip sequentially with clean, editorial ease, giving the feel of turning pages in a premium lookbook.

### 2. CAD Before/After Image Slider
A touch-responsive slider splits a project container:
*   *Left Side*: A precise vector structural blueprint showcasing coordinate grids, columns, and rafters.
*   *Right Side*: A photorealistic rendered visualization highlighting material textures, glass reflections, and spatial depth.

### 3. Draggable Material Flat-Lay Board
An interactive Easter Egg board representing traditional and modern construction components:
*   *Terracotta Brick* (eco-durability)
*   *Carved Sal Wood* (vernacular heritage)
*   *Raw Cast Concrete* (modern monolithic shell)
*   *Slate Stone* (traditional roofing and textures)
*   *Patan Brass* (metal detailing & structural joints)
*   *Lokta Paper* (tactile Nepalese handmade textures)
*   *Clicking any material* pulls up an overlay specifying local Nepalese sources, ecological footprint, and spatial philosophy.

### 4. Specialized Academic & Prefab Sections
*   **`/journal`**: Explores prefab panel systems coordination from her role at *Bela Nepal Industries* and pragmatic sustainable compliance.
*   **`/thesis`**: Maps out historical plaza upgrades: *"Universal Spatial Restructuring in Historic Civic Squares"*, utilizing an interactive Nepalese Chowk courtyard drawing.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16 (App Router) for optimized static rendering, fast compiling, and high-performance SEO routing.
*   **Styling**: Tailwind CSS v4 featuring PostCSS modular variable registers.
*   **Animations**: Framer Motion for spring physics and layout animations.
*   **Icons**: Lucide React for crisp SVG icon modules.
*   **Theme Switcher**: `next-themes` mapped with custom `@custom-variant dark` selectors to prevent flash-on-hydration.

---

## 🚀 Getting Started

### 1. Clone & Navigate
```bash
git clone https://github.com/arthurrgg8-lgtm/anushka_portfolio.git
cd anushka_portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to experience the local environment.

### 4. Compile Production Build
```bash
npm run build
```

---

## 💎 Registry Credentials
*   **Full Name**: Ar. Anushka Khatri
*   **NEC Registration**: `REG NO: 94879` (Nepal Engineering Council)
*   **Official Deployment**: [https://anushkakhatri.vercel.app](https://anushkakhatri.vercel.app)
