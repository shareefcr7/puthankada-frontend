"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type BannerSlide = {
  _id: string;
  desktopImage: string;
  mobileImage: string;
  isActive: boolean;
  align: "left" | "center" | "right";
  tag: string;
  headline: string;
  subheadline: string;
  cta?: string;
  ctaSecondary?: string;
};

// Fallback banners in case API is not available
// NOTE: Place generated banner images in `public/images/` with these filenames:
//  - `grace-banner-desktop.jpg` (recommended 1600×900)
//  - `grace-banner-mobile.jpg`  (recommended 800×1200)
// See project README or the prompt below to generate a premium mobile hero image.
const fallbackSlides: BannerSlide[] = [
  {
    _id: "1",
    desktopImage: "/images/grace-banner-desktop.jpg",
    mobileImage: "/images/grace-banner-mobile.jpg",
    tag: "",
    headline: "",
    subheadline: "",
    cta: "",
    ctaSecondary: "",
    align: "center",
    isActive: true,
  },
];

let bannerCache: BannerSlide[] | null = null;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const api = process.env.NEXT_PUBLIC_API_URL;

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile((e as any).matches ?? mq.matches);
    // Set initial
    setIsMobile(mq.matches);
    // Add listener
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handle as any);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(handle as any);
    }
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handle as any);
      } else if (typeof mq.removeListener === "function") {
        mq.removeListener(handle as any);
      }
    };
  }, []);

  const fetchBanners = useCallback(async () => {
    if (!api) {
      setSlides(fallbackSlides);
      setLoading(false);
      return;
    }

    if (bannerCache) {
      setSlides(bannerCache);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${api}/banner`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      if (data.banners && Array.isArray(data.banners)) {
        const activeBanners = data.banners.filter((b: BannerSlide) => b.isActive);
        if (activeBanners.length > 0) {
          const mergedBanners = activeBanners.map((b: Partial<BannerSlide>) => {
            return {
              _id: b._id || Math.random().toString(),
              desktopImage: b.desktopImage || "",
              mobileImage: b.mobileImage || "",
              isActive: b.isActive ?? true,
              tag: b.tag || "",
              headline: b.headline || "",
              subheadline: b.subheadline || "",
              align: b.align || "left",
            } as BannerSlide;
          });
          bannerCache = mergedBanners;
          setSlides(mergedBanners);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error("HeroBanner: Fetch failed", err);
    }
    
    bannerCache = fallbackSlides;
    setSlides(fallbackSlides);
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const next = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length]);

  const back = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [slides.length]);

  useEffect(() => {
    if (paused || loading || slides.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused, loading, slides.length]);

  if (loading) {
    return (
      <div className="w-full h-[90vh] bg-[#fdf5e6] animate-pulse flex items-center justify-center">
        <div className="text-[#4b3121] font-light tracking-widest uppercase">Luxy</div>
      </div>
    );
  }

  const slide = slides[current];
  const isMobileImageUsed = !!(slide?.mobileImage && slide.mobileImage !== slide.desktopImage);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap');

        .banner-root {
          font-family: 'Montserrat', sans-serif;
          position: relative;
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          min-height: 360px;
          max-height: 900px;
          background: #fdf5e6;
          overflow: hidden;
        }

        .slide-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 8vw;
          z-index: 10;
        }

        .slide-container.center { justify-content: center; text-align: center; }
        .slide-container.right { justify-content: flex-end; text-align: right; }

        .text-content {
          max-width: 600px;
          color: #4b3121;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 24px;
          white-space: pre-line;
        }

        .subheadline {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(75, 49, 33, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4b3121;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: #4b3121;
          color: white;
        }

        .nav-prev { left: 30px; }
        .nav-next { right: 30px; }

        .indicators {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 20;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #4b3121;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
        }

        .indicator.active {
          background: #4b3121;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .nav-btn { display: none; }
          .slide-container { padding: 0 4vw; text-align: center !important; justify-content: center !important; }

          /* mobile-specific banner sizing for consistent crop */
          .banner-root { aspect-ratio: 3 / 4; height: auto !important; min-height: 360px !important; max-height: 820px !important; }
          
          /* If there's no separate mobile image, maintain landscape ratio on mobile to keep the whole image on-screen */
          .banner-root.no-mobile-image { aspect-ratio: 16 / 9; height: auto !important; min-height: 200px !important; max-height: 480px !important; }

          .headline { font-size: clamp(1.6rem, 6vw, 2.2rem); }
          .subheadline { font-size: 0.95rem; margin-bottom: 20px; }
        }
      `}</style>

      <section 
        className={`banner-root ${!isMobileImageUsed ? 'no-mobile-image' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-[10000ms] ease-linear"
                style={{ transform: isMobile ? 'scale(1)' : (paused ? 'scale(1.02)' : 'scale(1.05)') }}
              >
                <Image
                  src={isMobile && isMobileImageUsed ? slide.mobileImage : slide.desktopImage}
                  alt={slide.headline || 'banner'}
                  fill
                  className="object-cover"
                  style={{ objectPosition: isMobile && isMobileImageUsed ? 'center 40%' : 'center' }}
                  priority
                  unoptimized
                />
              </div>
            </div>
            {/* Image-only hero: no text overlay for cleaner composition on mobile */}
          </motion.div>
        </AnimatePresence>

        <button className="nav-btn nav-prev" onClick={back}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="nav-btn nav-next" onClick={next}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="indicators">
          {slides.map((_, i) => (
            <button 
              key={i}
              className={`indicator ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
