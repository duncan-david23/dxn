"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function LandingPageUi() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Custom cursor
    if (window.matchMedia("(min-width:901px)").matches && cursorRef.current) {
      const cursor = cursorRef.current;
      const moveCursor = (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      };
      window.addEventListener("mousemove", moveCursor);

      document.querySelectorAll("[data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () =>
          cursor.classList.add("expand")
        );
        el.addEventListener("mouseleave", () =>
          cursor.classList.remove("expand")
        );
      });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", moveCursor);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax effect on rig
  useEffect(() => {
    const rig = document.querySelector(".rig");
    const handleParallax = () => {
      const y = window.scrollY;
      if (rig) rig.style.transform = `translateY(calc(-50% + ${y * 0.08}px))`;
    };
    window.addEventListener("scroll", handleParallax, { passive: true });
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  // Lock body scroll when mobile menu open + close on resize to desktop
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #050706;
          --panel: #0a0e0c;
          --graphite: #121613;
          --line: rgba(243, 245, 242, 0.09);
          --line-strong: rgba(243, 245, 242, 0.16);
          --white: #f3f5f2;
          --gray: #8b968f;
          --gray-dim: #5c6560;
          --emerald: #1fae7a;
          --emerald-bright: #3fe0a6;
          --emerald-dim: #0c3626;
          --font-head: "Space Grotesk", sans-serif;
          --font-body: "Inter", sans-serif;
          --font-mono: "IBM Plex Mono", monospace;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        body {
          background: var(--bg);
          color: var(--white);
          font-family: var(--font-body);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        ::selection {
          background: var(--emerald-dim);
          color: var(--emerald-bright);
        }

        /* grain overlay */
        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* custom cursor */
        .cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 22px;
          height: 22px;
          border: 1px solid var(--emerald-bright);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease,
            opacity 0.2s ease;
          mix-blend-mode: difference;
        }
        .cursor.expand {
          width: 56px;
          height: 56px;
          background: rgba(63, 224, 166, 0.12);
        }
        @media (max-width: 900px) {
          .cursor {
            display: none;
          }
        }

        a {
          color: inherit;
          text-decoration: none;
        }
        img,
        svg {
          display: block;
          max-width: 100%;
        }
        .mono {
          font-family: var(--font-mono);
        }
        .wrap {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 900px) {
          .wrap { padding: 0 24px; }
        }
        @media (max-width: 480px) {
          .wrap { padding: 0 18px; }
        }

        /* ---------- NAV ---------- */
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          padding: 26px 0;
          transition: background 0.4s ease, padding 0.4s ease,
            border-color 0.4s ease, backdrop-filter 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        header.scrolled {
          padding: 16px 0;
          background: rgba(5, 7, 6, 0.72);
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          border-bottom: 1px solid var(--line);
        }
        .navrow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .logo {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
        }
        .logo .dot {
          width: 7px;
          height: 7px;
          background: var(--emerald-bright);
          border-radius: 50%;
          box-shadow: 0 0 12px 2px rgba(63, 224, 166, 0.6);
        }
        nav.primary {
          display: flex;
          gap: 36px;
        }
        nav.primary a {
          font-size: 13.5px;
          color: var(--gray);
          letter-spacing: 0.01em;
          position: relative;
          padding: 4px 0;
          transition: color 0.25s ease;
        }
        nav.primary a:hover {
          color: var(--white);
        }
        nav.primary a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 0;
          background: var(--emerald-bright);
          transition: width 0.3s ease;
        }
        nav.primary a:hover::after {
          width: 100%;
        }
        .nav-cta {
          font-size: 13px;
          padding: 11px 22px;
          border: 1px solid var(--line-strong);
          border-radius: 2px;
          transition: border-color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }
        .nav-cta:hover {
          border-color: var(--emerald-bright);
          background: rgba(63, 224, 166, 0.06);
        }
        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          z-index: 600;
          padding: 8px;
          margin: -8px;
          background: transparent;
          border: none;
          flex-shrink: 0;
        }
        .burger span {
          width: 26px;
          height: 1px;
          background: var(--white);
          display: block;
          transition: 0.3s;
        }
        .burger.open span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .burger.open span:nth-child(2) {
          opacity: 0;
        }
        .burger.open span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }
        @media (max-width: 900px) {
          nav.primary,
          .nav-cta {
            display: none;
          }
          .burger {
            display: flex;
          }
        }

        /* mobile menu — scrollable */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--bg);
          z-index: 490;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 100px 24px 40px;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mobile-menu.open {
          transform: translateY(0);
        }
        .mobile-menu a {
          font-family: var(--font-head);
          font-size: 32px;
          font-weight: 600;
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          color: var(--white);
          line-height: 1.1;
          flex-shrink: 0;
        }
        .mobile-menu .mm-contact {
          margin-top: 28px;
          color: var(--emerald-bright);
          font-family: var(--font-mono);
          font-size: 15px;
          border-bottom: none;
        }
        @media (max-width: 480px) {
          .mobile-menu {
            padding: 88px 20px 32px;
          }
          .mobile-menu a {
            font-size: 26px;
            padding: 14px 0;
          }
        }
        @media (max-width: 360px) {
          .mobile-menu a {
            font-size: 22px;
          }
        }

        /* ---------- HERO ---------- */
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 160px 0 0 0;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
              ellipse 60% 50% at 78% 30%,
              rgba(31, 174, 122, 0.16),
              transparent 60%
            ),
            radial-gradient(
              ellipse 80% 60% at 20% 90%,
              rgba(18, 22, 19, 0.9),
              transparent 70%
            ),
            linear-gradient(180deg, #050706 0%, #060907 55%, #050706 100%);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.5;
          background-image: linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(
            ellipse 70% 60% at 60% 40%,
            black,
            transparent 75%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 70% 60% at 60% 40%,
            black,
            transparent 75%
          );
        }
        .hero-inner {
          position: relative;
          z-index: 2;
        }
        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          padding: 0 48px;
          margin-bottom: 56px;
        }
        @media (max-width: 900px) {
          .hero-top {
            padding: 0 24px;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 36px;
          }
        }
        @media (max-width: 480px) {
          .hero-top { padding: 0 18px; }
        }
        .eyebrow-mono {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--gray);
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 10px;
          line-height: 1.5;
          flex-wrap: wrap;
        }
        .eyebrow-mono .bar {
          width: 26px;
          height: 1px;
          background: var(--emerald);
          display: inline-block;
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .eyebrow-mono {
            font-size: 10.5px;
            letter-spacing: 0.04em;
          }
        }
        .hero-headline {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: clamp(38px, 8vw, 118px);
          line-height: 1;
          letter-spacing: -0.02em;
          padding: 0 48px;
          max-width: 1300px;
          word-break: break-word;
        }
        @media (max-width: 900px) {
          .hero-headline { padding: 0 24px; }
        }
        @media (max-width: 480px) {
          .hero-headline {
            padding: 0 18px;
            font-size: clamp(32px, 11vw, 56px);
          }
        }
        .hero-headline .line {
          overflow: hidden;
          display: block;
        }
        .accent-word {
          color: var(--emerald-bright);
          font-style: normal;
        }
        .hero-headline span {
          display: inline-block;
          transform: translateY(110%);
          animation: riseUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-headline .line:nth-child(1) span {
          animation-delay: 0.15s;
        }
        .hero-headline .line:nth-child(2) span {
          animation-delay: 0.3s;
        }
        @keyframes riseUp {
          to {
            transform: translateY(0);
          }
        }

        .hero-sub-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          padding: 56px 48px 64px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .hero-sub-row {
            padding: 36px 24px 48px;
            gap: 24px;
          }
        }
        @media (max-width: 480px) {
          .hero-sub-row {
            padding: 28px 18px 40px;
          }
        }
        .hero-sub {
          max-width: 420px;
          color: var(--gray);
          font-size: 16px;
          line-height: 1.6;
          flex: 1 1 280px;
        }
        @media (max-width: 480px) {
          .hero-sub {
            font-size: 15px;
          }
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .hero-actions {
            width: 100%;
            gap: 10px;
          }
        }
        .btn {
          font-size: 13.5px;
          padding: 15px 26px;
          border-radius: 2px;
          font-family: var(--font-body);
          font-weight: 500;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
            background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          display: inline-block;
          text-align: center;
        }
        @media (max-width: 480px) {
          .hero-actions .btn {
            flex: 1 1 auto;
            padding: 14px 20px;
            font-size: 13px;
          }
        }
        .btn-solid {
          background: var(--white);
          color: var(--bg);
        }
        .btn-solid:hover {
          background: var(--emerald-bright);
          transform: translateY(-2px);
        }
        .btn-ghost {
          border: 1px solid var(--line-strong);
        }
        .btn-ghost:hover {
          border-color: var(--emerald-bright);
          color: var(--emerald-bright);
          transform: translateY(-2px);
        }

        .hero-visual {
          position: relative;
          height: 56vh;
          min-height: 420px;
          width: 100%;
        }
        .rig {
          position: absolute;
          right: 2%;
          top: 50%;
          transform: translateY(-50%);
          width: min(64%, 620px);
          height: auto;
          aspect-ratio: 1.55;
          filter: drop-shadow(0 30px 70px rgba(0, 0, 0, 0.65));
        }
        .blade {
          transform-box: fill-box;
          transform-origin: center;
          animation: rotorSpin 0.18s linear infinite;
        }
        .blade-fast {
          animation-duration: 0.14s;
          animation-direction: reverse;
        }
        @keyframes rotorSpin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .blade {
            animation: none;
          }
        }
        .rig-bg-shape {
          position: absolute;
          inset: 0;
          opacity: 0.9;
        }
        .spec-tag {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--gray);
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }
        .spec-tag .tick {
          width: 16px;
          height: 1px;
          background: var(--line-strong);
        }
        .spec-tag.t1 {
          top: 8%;
          left: 2%;
          animation-delay: 1.1s;
        }
        .spec-tag.t2 {
          top: 42%;
          left: 0%;
          animation-delay: 1.3s;
        }
        .spec-tag.t3 {
          bottom: 14%;
          left: 4%;
          animation-delay: 1.5s;
        }
        .spec-tag.t4 {
          top: 12%;
          right: 2%;
          animation-delay: 1.7s;
          text-align: right;
          flex-direction: row-reverse;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .ghost-silhouette {
          position: absolute;
          opacity: 0.18;
        }
        .ghost-drone {
          top: 8%;
          left: 8%;
          width: 120px;
        }
        .ghost-bot {
          bottom: 6%;
          left: 14%;
          width: 70px;
        }
        @media (max-width: 900px) {
          .hero-visual {
            height: 42vh;
            min-height: 280px;
          }
          .spec-tag {
            display: none;
          }
          .rig {
            right: 0;
            left: 0;
            margin: 0 auto;
            width: min(88%, 520px);
          }
        }
        @media (max-width: 480px) {
          .hero-visual {
            height: 36vh;
            min-height: 220px;
          }
          .rig {
            width: 94%;
          }
          .ghost-bot {
            width: 50px;
            left: 8%;
          }
        }

        .scroll-cue {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--gray-dim);
          letter-spacing: 0.08em;
        }
        @media (max-width: 900px) {
          .scroll-cue {
            display: none;
          }
        }
        .scroll-cue .stem {
          width: 1px;
          height: 34px;
          background: linear-gradient(var(--line-strong), transparent);
          position: relative;
          overflow: hidden;
        }
        .scroll-cue .stem::after {
          content: "";
          position: absolute;
          top: -40%;
          left: 0;
          width: 100%;
          height: 40%;
          background: var(--emerald-bright);
          animation: scrollDrop 1.8s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0% {
            top: -40%;
          }
          100% {
            top: 100%;
          }
        }

        /* ---------- SECTION SHARED ---------- */
        section {
          position: relative;
          padding: 150px 0;
        }
        @media (max-width: 900px) {
          section { padding: 90px 0; }
        }
        @media (max-width: 480px) {
          section { padding: 72px 0; }
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          margin-bottom: 80px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .section-head {
            margin-bottom: 48px;
            gap: 20px;
          }
        }
        .section-title {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: clamp(28px, 4.4vw, 54px);
          letter-spacing: -0.01em;
          line-height: 1.08;
          max-width: 680px;
        }
        .section-note {
          max-width: 320px;
          color: var(--gray);
          font-size: 14.5px;
          line-height: 1.6;
        }
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------- THREE FRONTIERS ---------- */
        .frontiers {
          border-top: 1px solid var(--line);
        }
        .frontier-row {
          display: grid;
          grid-template-columns: 100px 1fr 1fr;
          gap: 32px;
          align-items: start;
          padding: 52px 0;
          border-bottom: 1px solid var(--line);
        }
        .frontier-row:last-child {
          border-bottom: none;
        }
        .frontier-num {
          font-family: var(--font-mono);
          color: var(--gray-dim);
          font-size: 14px;
          padding-top: 6px;
        }
        .frontier-name {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: clamp(26px, 3.4vw, 42px);
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        .frontier-row:hover .frontier-name {
          color: var(--emerald-bright);
        }
        .frontier-desc {
          color: var(--gray);
          font-size: 15.5px;
          line-height: 1.65;
          max-width: 420px;
          padding-top: 8px;
        }
        .frontier-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }
        .frontier-tags span {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--gray-dim);
          border: 1px solid var(--line);
          padding: 5px 10px;
          border-radius: 2px;
        }
        @media (max-width: 900px) {
          .frontier-row {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 40px 0;
          }
          .frontier-num {
            padding-top: 0;
          }
          .frontier-desc {
            padding-top: 0;
          }
        }

        /* ---------- DIVISION SHOWCASE CARDS ---------- */
        .divisions {
          background: var(--panel);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .division-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
        }
        .division-card {
          background: var(--bg);
          display: flex;
          flex-direction: column;
          min-height: 460px;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .division-card:hover {
          background: #070a08;
        }
        .division-card:hover .division-glow {
          opacity: 1;
        }
        .division-glow {
          position: absolute;
          top: -30%;
          right: -30%;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(31, 174, 122, 0.22),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 2;
        }
        .division-scene {
          position: relative;
          height: 160px;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background: linear-gradient(
            180deg,
            rgba(31, 174, 122, 0.05),
            transparent 75%
          );
        }
        .division-scene svg {
          width: 100%;
          height: 100%;
        }
        .division-body {
          padding: 28px 36px 36px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .division-index {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--gray-dim);
        }
        .division-title {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 26px;
          margin-top: 18px;
          letter-spacing: -0.01em;
        }
        .division-desc {
          color: var(--gray);
          font-size: 14.5px;
          line-height: 1.6;
          margin-top: 14px;
          max-width: 280px;
        }
        .division-link {
          margin-top: 26px;
          font-size: 13px;
          font-family: var(--font-mono);
          color: var(--emerald-bright);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .division-link .arrow {
          transition: transform 0.3s ease;
        }
        .division-card:hover .arrow {
          transform: translateX(5px);
        }
        @media (max-width: 960px) {
          .division-grid {
            grid-template-columns: 1fr;
          }
          .division-card {
            min-height: auto;
          }
        }
        @media (max-width: 480px) {
          .division-body {
            padding: 24px 24px 28px;
          }
          .division-title {
            font-size: 22px;
          }
        }

        /* cart (robotics scene) */
        .wheel-spoke {
          transform-box: fill-box;
          transform-origin: center;
          animation: rotorSpin 0.7s linear infinite;
        }
        .cart-drive {
          animation: cartDrive 7s ease-in-out infinite alternate;
        }
        @keyframes cartDrive {
          0% {
            transform: translateX(20px);
          }
          100% {
            transform: translateX(280px);
          }
        }
        .status-blink {
          animation: blink 1.6s ease-in-out infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.25;
          }
        }

        /* drone (autonomous scene) */
        .drone-float {
          animation: droneFloat 3.4s ease-in-out infinite;
          transform-box: fill-box;
        }
        @keyframes droneFloat {
          0%,
          100% {
            transform: translateY(-5px);
          }
          50% {
            transform: translateY(5px);
          }
        }

        /* software node-graph scene */
        .node-pulse {
          fill: var(--emerald-bright);
        }

        /* ---------- TECHNOLOGY ARCHITECTURE ---------- */
        .tech-section .wrap {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .tech-section .wrap {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        .tech-copy p {
          color: var(--gray);
          font-size: 15.5px;
          line-height: 1.7;
          max-width: 420px;
          margin-top: 22px;
        }
        .stack-list {
          margin-top: 34px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .stack-item {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--line);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--gray);
          gap: 12px;
        }
        .stack-item span:last-child {
          color: var(--gray-dim);
          text-align: right;
        }
        @media (max-width: 480px) {
          .stack-item {
            font-size: 11.5px;
          }
        }
        .node-diagram {
          position: relative;
          aspect-ratio: 1/0.82;
          max-width: 520px;
          margin: 0 auto;
          width: 100%;
        }

        /* ---------- MISSION / VISION ---------- */
        .mission-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding-bottom: 90px;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 760px) {
          .mission-vision-grid {
            grid-template-columns: 1fr;
            gap: 44px;
            padding-bottom: 60px;
          }
        }
        .mv-num {
          color: var(--gray-dim);
          font-size: 13px;
          margin-bottom: 16px;
        }
        .mv-title {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }
        .mv-text {
          color: var(--gray);
          font-size: 15.5px;
          line-height: 1.7;
          max-width: 440px;
        }

        /* ---------- LEADERSHIP ---------- */
        .leadership {
          padding-top: 90px;
        }
        @media (max-width: 900px) {
          .leadership { padding-top: 60px; }
        }
        .leader-card {
          display: flex;
          gap: 48px;
          align-items: flex-start;
          margin-top: 40px;
          border: 1px solid var(--line);
          background: var(--panel);
          padding: 44px;
        }
        @media (max-width: 720px) {
          .leader-card {
            flex-direction: column;
            gap: 28px;
            padding: 32px 24px;
          }
        }
        .leader-portrait {
          width: 150px;
          height: 150px;
          flex: none;
          border: 1px solid var(--line-strong);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(
              circle at 30% 20%,
              rgba(31, 174, 122, 0.14),
              transparent 60%
            ),
            var(--bg);
        }
        @media (max-width: 480px) {
          .leader-portrait {
            width: 110px;
            height: 110px;
          }
        }
        .leader-portrait svg {
          width: 100%;
          height: 100%;
        }
        .leader-name {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 28px;
          letter-spacing: -0.01em;
        }
        @media (max-width: 480px) {
          .leader-name { font-size: 22px; }
        }
        .leader-title {
          color: var(--gray-dim);
          font-size: 12px;
          letter-spacing: 0.06em;
          margin-top: 8px;
          margin-bottom: 20px;
        }
        .leader-bio {
          color: var(--gray);
          font-size: 15px;
          line-height: 1.7;
          max-width: 480px;
        }
        .leader-links {
          display: flex;
          gap: 20px;
          margin-top: 22px;
        }
        .leader-link {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--emerald-bright);
        }
        .leader-link:hover {
          color: var(--white);
        }

        .statement {
          text-align: center;
          padding: 180px 0;
        }
        @media (max-width: 900px) {
          .statement { padding: 90px 0; }
        }
        .statement-text {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: clamp(26px, 5vw, 58px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          max-width: 980px;
          margin: 0 auto;
        }
        .statement-text em {
          color: var(--emerald-bright);
          font-style: normal;
        }
        .statement-sub {
          margin-top: 28px;
          color: var(--gray-dim);
          font-family: var(--font-mono);
          font-size: 12.5px;
          letter-spacing: 0.05em;
        }

        /* ---------- CTA / CONTACT ---------- */
        .cta-section {
          background: var(--graphite);
          border-top: 1px solid var(--line);
        }
        .cta-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
          padding: 100px 0;
        }
        @media (max-width: 900px) {
          .cta-inner {
            padding: 60px 0;
            gap: 28px;
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .cta-title {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: clamp(30px, 5vw, 64px);
          letter-spacing: -0.01em;
          max-width: 640px;
        }
        .cta-inner .btn {
          flex: 0 0 auto;
          white-space: nowrap;
          max-width: 100%;
        }
        @media (max-width: 900px) {
          .cta-inner .btn {
            width: auto;
            align-self: flex-start;
          }
        }
        @media (max-width: 480px) {
          .cta-inner .btn {
            width: 100%;
          }
        }

        /* ---------- FOOTER ---------- */
        footer {
          padding: 70px 0 40px;
        }
        @media (max-width: 900px) {
          footer { padding: 50px 0 30px; }
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr repeat(4, 1fr);
          gap: 40px;
          padding-bottom: 60px;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            padding-bottom: 40px;
          }
        }
        @media (max-width: 480px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        .footer-col h4 {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--gray-dim);
          letter-spacing: 0.06em;
          margin-bottom: 18px;
        }
        .footer-col a {
          display: block;
          font-size: 14px;
          color: var(--gray);
          padding: 6px 0;
          transition: color 0.25s ease;
        }
        .footer-col a:hover {
          color: var(--white);
        }
        .footer-brand-desc {
          color: var(--gray);
          font-size: 14px;
          max-width: 280px;
          line-height: 1.6;
          margin-top: 16px;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          padding-top: 28px;
          color: var(--gray-dim);
          font-size: 12.5px;
          font-family: var(--font-mono);
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="grain"></div>
      <div className="cursor" ref={cursorRef}></div>

      <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
        <div className="wrap navrow">
          <Link href="/" className="logo">
            <span className="dot"></span>DURXAN
          </Link>
          <nav className="primary">
            <Link href="/robotics">Robotics</Link>
            <Link href="/autonomous">Autonomous Systems</Link>
            <Link href="/software">Software</Link>
            <Link href="/#industries">Industries</Link>
            <Link href="/#company">Company</Link>
            <Link href="/#careers">Careers</Link>
          </nav>
          <Link href="/#contact" className="nav-cta" data-hover>
            Contact
          </Link>
          <button
            className={`burger ${mobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link href="/robotics" onClick={closeMobileMenu}>
          Robotics
        </Link>
        <Link href="/autonomous" onClick={closeMobileMenu}>
          Autonomous Systems
        </Link>
        <Link href="/software" onClick={closeMobileMenu}>
          Software
        </Link>
        <Link href="/#industries" onClick={closeMobileMenu}>
          Industries
        </Link>
        <Link href="/#company" onClick={closeMobileMenu}>
          Company
        </Link>
        <Link href="/#insights" onClick={closeMobileMenu}>
          Insights
        </Link>
        <Link href="/#careers" onClick={closeMobileMenu}>
          Careers
        </Link>
        <Link href="/#contact" className="mm-contact" onClick={closeMobileMenu}>
          Start a conversation →
        </Link>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-top">
            <div className="eyebrow-mono">
              <span className="bar"></span>ROBOTICS / AUTONOMOUS SYSTEMS /
              SOFTWARE
            </div>
            <div className="eyebrow-mono">EST. DURXAN — GLOBAL</div>
          </div>
          <h1 className="hero-headline">
            <span className="line">
              <span>
                WE BUILD <em className="accent-word">MACHINES</em>
              </span>
            </span>
            <span className="line">
              <span>THAT THINK.</span>
            </span>
          </h1>
          <div className="hero-sub-row">
            <p className="hero-sub">
              Robotics. Autonomous systems. Intelligent software. DURXAN
              engineers intelligence for the real world — machines that
              perceive, decide, and act.
            </p>
            <div className="hero-actions">
              <Link href="/#company" className="btn btn-solid" data-hover>
                Explore DURXAN
              </Link>
              <Link href="/#tech" className="btn btn-ghost" data-hover>
                Explore Our Technology
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <svg
              className="rig"
              viewBox="0 0 620 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-hover-img
            >
              <defs>
                <linearGradient id="rigGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3fe0a6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#1fae7a" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="rotorGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3fe0a6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3fe0a6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="podGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a201c" />
                  <stop offset="100%" stopColor="#0a0e0c" />
                </linearGradient>
              </defs>

              <circle cx="120" cy="110" r="66" fill="url(#rotorGlow)" />
              <circle cx="500" cy="110" r="66" fill="url(#rotorGlow)" />
              <circle cx="120" cy="300" r="66" fill="url(#rotorGlow)" />
              <circle cx="500" cy="300" r="66" fill="url(#rotorGlow)" />

              <circle cx="120" cy="110" r="58" stroke="#3a4640" strokeWidth="1.2" />
              <circle
                cx="120"
                cy="110"
                r="58"
                stroke="url(#rigGrad)"
                strokeWidth="1.2"
                strokeDasharray="8 300"
              />
              <circle cx="500" cy="110" r="58" stroke="#3a4640" strokeWidth="1.2" />
              <circle
                cx="500"
                cy="110"
                r="58"
                stroke="url(#rigGrad)"
                strokeWidth="1.2"
                strokeDasharray="8 300"
              />
              <circle cx="120" cy="300" r="58" stroke="#3a4640" strokeWidth="1.2" />
              <circle
                cx="120"
                cy="300"
                r="58"
                stroke="url(#rigGrad)"
                strokeWidth="1.2"
                strokeDasharray="8 300"
              />
              <circle cx="500" cy="300" r="58" stroke="#3a4640" strokeWidth="1.2" />
              <circle
                cx="500"
                cy="300"
                r="58"
                stroke="url(#rigGrad)"
                strokeWidth="1.2"
                strokeDasharray="8 300"
              />

              <g className="blade" stroke="#5c6560" strokeWidth="1">
                <line x1="70" y1="110" x2="170" y2="110" />
                <line x1="120" y1="60" x2="120" y2="160" />
              </g>
              <g className="blade blade-fast" stroke="#5c6560" strokeWidth="1">
                <line x1="450" y1="110" x2="550" y2="110" />
                <line x1="500" y1="60" x2="500" y2="160" />
              </g>
              <g className="blade blade-fast" stroke="#5c6560" strokeWidth="1">
                <line x1="70" y1="300" x2="170" y2="300" />
                <line x1="120" y1="250" x2="120" y2="350" />
              </g>
              <g className="blade" stroke="#5c6560" strokeWidth="1">
                <line x1="450" y1="300" x2="550" y2="300" />
                <line x1="500" y1="250" x2="500" y2="350" />
              </g>
              <circle cx="120" cy="110" r="5" fill="#3fe0a6" />
              <circle cx="500" cy="110" r="5" fill="#3fe0a6" />
              <circle cx="120" cy="300" r="5" fill="#3fe0a6" />
              <circle cx="500" cy="300" r="5" fill="#3fe0a6" />

              <g stroke="#3a4640" strokeWidth="1.6">
                <line x1="164" y1="140" x2="262" y2="182" />
                <line x1="456" y1="140" x2="358" y2="182" />
                <line x1="164" y1="270" x2="262" y2="228" />
                <line x1="456" y1="270" x2="358" y2="228" />
              </g>

              <path
                d="M262 182 L358 182 L378 205 L358 228 L262 228 L242 205 Z"
                fill="url(#podGrad)"
                stroke="url(#rigGrad)"
                strokeWidth="1.6"
              />
              <circle cx="310" cy="205" r="16" stroke="#3fe0a6" strokeWidth="1.3" />
              <circle cx="310" cy="205" r="5" fill="#3fe0a6" />
              <line
                x1="310"
                y1="228"
                x2="310"
                y2="250"
                stroke="#3a4640"
                strokeWidth="1.4"
              />
              <circle cx="310" cy="256" r="7" stroke="#3fe0a6" strokeWidth="1.2" />
              <line
                x1="345"
                y1="182"
                x2="352"
                y2="160"
                stroke="#3a4640"
                strokeWidth="1.2"
              />
              <circle cx="353" cy="156" r="2.6" fill="#3fe0a6" />

              <line
                x1="310"
                y1="80"
                x2="310"
                y2="330"
                stroke="#1a201c"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
              <line
                x1="30"
                y1="205"
                x2="590"
                y2="205"
                stroke="#1a201c"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
            </svg>

            <svg
              className="ghost-silhouette ghost-bot"
              viewBox="0 0 60 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="15"
                y="8"
                width="30"
                height="28"
                rx="5"
                stroke="#8b968f"
                strokeWidth="1"
              />
              <rect
                x="10"
                y="38"
                width="40"
                height="36"
                rx="4"
                stroke="#8b968f"
                strokeWidth="1"
              />
              <line x1="20" y1="74" x2="20" y2="88" stroke="#8b968f" strokeWidth="1" />
              <line x1="40" y1="74" x2="40" y2="88" stroke="#8b968f" strokeWidth="1" />
            </svg>

            <div className="spec-tag t1">
              <span className="tick"></span>UNIT — AERIAL.01
            </div>
            <div className="spec-tag t2">
              <span className="tick"></span>WINGSPAN 1.4M
            </div>
            <div className="spec-tag t3">
              <span className="tick"></span>STATUS — OPERATIONAL
            </div>
            <div className="spec-tag t4">
              AUTONOMY LEVEL — SUPERVISED<span className="tick"></span>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>SCROLL</span>
          <span className="stem"></span>
        </div>
      </section>

      {/* THREE FRONTIERS */}
      <section className="frontiers" id="tech">
        <div className="wrap">
          <div className="section-head reveal">
            <h2 className="section-title">
              Three technology frontiers, one engineering discipline.
            </h2>
            <p className="section-note">
              DURXAN builds both intelligent machines and the intelligent
              digital systems that run them.
            </p>
          </div>

          <Link href="/robotics" className="frontier-row reveal" id="robotics">
            <div className="frontier-num">01</div>
            <div>
              <div className="frontier-name">Robotics</div>
              <div className="frontier-tags">
                <span>Humanoid</span>
                <span>Household</span>
                <span>Delivery</span>
                <span>Specialized</span>
              </div>
            </div>
            <div className="frontier-desc">
              Machines that perceive, move, interact, and assist — built to
              operate in human environments, homes, and industrial facilities.
            </div>
          </Link>

          <Link href="/autonomous" className="frontier-row reveal" id="autonomous">
            <div className="frontier-num">02</div>
            <div>
              <div className="frontier-name">Autonomous Systems</div>
              <div className="frontier-tags">
                <span>Drones</span>
                <span>Delivery</span>
                <span>Defense &amp; Security</span>
                <span>Ground Platforms</span>
              </div>
            </div>
            <div className="frontier-desc">
              Intelligent aerial and ground systems engineered to operate with
              increasing levels of autonomy, under human supervision.
            </div>
          </Link>

          <Link href="/software" className="frontier-row reveal" id="software">
            <div className="frontier-num">03</div>
            <div>
              <div className="frontier-name">Software</div>
              <div className="frontier-tags">
                <span>Defense &amp; Security</span>
                <span>Enterprise</span>
                <span>Analytics</span>
                <span>Logistics</span>
                <span>AI Systems</span>
              </div>
            </div>
            <div className="frontier-desc">
              Intelligent digital infrastructure for businesses, security,
              defense, and enterprise operations — the layer that connects it
              all.
            </div>
          </Link>
        </div>
      </section>

      {/* DIVISION SHOWCASE */}
      <section className="divisions" style={{ padding: 0 }}>
        <div className="division-grid">
          <Link href="/robotics" className="division-card" data-hover>
            <div className="division-glow"></div>
            <div className="division-scene">
              <svg
                viewBox="0 0 400 160"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="128"
                  x2="400"
                  y2="128"
                  stroke="#1a201c"
                  strokeWidth="1"
                  strokeDasharray="3 7"
                />
                <g className="cart-drive">
                  <g stroke="#3fe0a6" strokeWidth="1.3" fill="none">
                    <rect x="-30" y="74" width="60" height="26" rx="4" />
                    <rect x="-16" y="58" width="32" height="18" rx="3" />
                  </g>
                  <line x1="0" y1="58" x2="0" y2="46" stroke="#3a4640" strokeWidth="1.2" />
                  <circle className="status-blink" cx="0" cy="43" r="2.6" fill="#3fe0a6" />
                  <g>
                    <circle
                      cx="-17"
                      cy="106"
                      r="9"
                      stroke="#5c6560"
                      strokeWidth="1.2"
                      fill="#0a0e0c"
                    />
                    <line
                      className="wheel-spoke"
                      x1="-17"
                      y1="98"
                      x2="-17"
                      y2="114"
                      stroke="#5c6560"
                      strokeWidth="1"
                    />
                    <circle
                      cx="17"
                      cy="106"
                      r="9"
                      stroke="#5c6560"
                      strokeWidth="1.2"
                      fill="#0a0e0c"
                    />
                    <line
                      className="wheel-spoke"
                      x1="17"
                      y1="98"
                      x2="17"
                      y2="114"
                      stroke="#5c6560"
                      strokeWidth="1"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="division-body">
              <div className="division-index mono">ROBOTICS</div>
              <div className="division-title">The next generation of machines.</div>
              <p className="division-desc">
                Humanoid, household, delivery, and specialized robots designed
                for the physical world.
              </p>
              <span className="division-link">
                View division <span className="arrow">→</span>
              </span>
            </div>
          </Link>

          <Link href="/autonomous" className="division-card" data-hover>
            <div className="division-glow"></div>
            <div className="division-scene">
              <svg
                viewBox="0 0 400 160"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="drone-float">
                  <g stroke="#5c6560" strokeWidth="1.4">
                    <line x1="164" y1="62" x2="122" y2="80" />
                    <line x1="236" y1="62" x2="278" y2="80" />
                    <line x1="164" y1="98" x2="122" y2="80" />
                    <line x1="236" y1="98" x2="278" y2="80" />
                  </g>
                  <path
                    d="M164 62 L236 62 L250 80 L236 98 L164 98 L150 80 Z"
                    fill="#0a0e0c"
                    stroke="#3fe0a6"
                    strokeWidth="1.4"
                  />
                  <circle cx="200" cy="80" r="9" stroke="#3fe0a6" strokeWidth="1.2" />
                  <circle cx="200" cy="80" r="3" fill="#3fe0a6" />
                  <g stroke="#3a4640" strokeWidth="1.1">
                    <circle cx="122" cy="80" r="26" />
                    <circle cx="278" cy="80" r="26" />
                  </g>
                  <g className="blade" stroke="#5c6560" strokeWidth="1">
                    <line x1="98" y1="80" x2="146" y2="80" />
                    <line x1="122" y1="56" x2="122" y2="104" />
                  </g>
                  <g className="blade blade-fast" stroke="#5c6560" strokeWidth="1">
                    <line x1="254" y1="80" x2="302" y2="80" />
                    <line x1="278" y1="56" x2="278" y2="104" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="division-body">
              <div className="division-index mono">AUTONOMOUS SYSTEMS</div>
              <div className="division-title">Autonomy takes flight.</div>
              <p className="division-desc">
                Aerial and ground platforms with sensing, navigation, and
                mission management built in.
              </p>
              <span className="division-link">
                View division <span className="arrow">→</span>
              </span>
            </div>
          </Link>

          <Link href="/software" className="division-card" data-hover>
            <div className="division-glow"></div>
            <div className="division-scene">
              <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#233029" strokeWidth="1">
                  <line x1="200" y1="80" x2="90" y2="40" />
                  <line x1="200" y1="80" x2="310" y2="40" />
                  <line x1="200" y1="80" x2="90" y2="122" />
                  <line x1="200" y1="80" x2="310" y2="122" />
                  <line x1="200" y1="80" x2="200" y2="22" />
                </g>
                <circle
                  cx="200"
                  cy="80"
                  r="10"
                  stroke="#3fe0a6"
                  strokeWidth="1.3"
                  fill="#0a0e0c"
                />
                <g stroke="#3a4640" strokeWidth="1" fill="#0a0e0c">
                  <circle cx="90" cy="40" r="6" />
                  <circle cx="310" cy="40" r="6" />
                  <circle cx="90" cy="122" r="6" />
                  <circle cx="310" cy="122" r="6" />
                  <circle cx="200" cy="22" r="6" />
                </g>
                <circle className="node-pulse" r="3" cx="200" cy="80">
                  <animateMotion
                    path="M200,80 L90,40"
                    dur="1.8s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="1.8s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle className="node-pulse" r="3" cx="200" cy="80">
                  <animateMotion
                    path="M200,80 L310,40"
                    dur="1.8s"
                    begin="0.35s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="1.8s"
                    begin="0.35s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle className="node-pulse" r="3" cx="200" cy="80">
                  <animateMotion
                    path="M200,80 L90,122"
                    dur="1.8s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="1.8s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle className="node-pulse" r="3" cx="200" cy="80">
                  <animateMotion
                    path="M200,80 L310,122"
                    dur="1.8s"
                    begin="1.05s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="1.8s"
                    begin="1.05s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle className="node-pulse" r="3" cx="200" cy="80">
                  <animateMotion
                    path="M200,80 L200,22"
                    dur="1.8s"
                    begin="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="1.8s"
                    begin="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
            <div className="division-body">
              <div className="division-index mono">SOFTWARE</div>
              <div className="division-title">Intelligence without limits.</div>
              <p className="division-desc">
                From defense intelligence platforms to enterprise automation and
                analytics.
              </p>
              <span className="division-link">
                View division <span className="arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* TECHNOLOGY ARCHITECTURE */}
      <section className="tech-section">
        <div className="wrap">
          <div className="tech-copy reveal">
            <div className="eyebrow-mono">
              <span className="bar"></span>ARCHITECTURE
            </div>
            <h2 className="section-title" style={{ marginTop: "18px" }}>
              Inside the DURXAN stack.
            </h2>
            <p>
              Every machine and every platform is built on the same
              technological foundation — perception, decision, and action,
              engineered to work together.
            </p>
            <div className="stack-list">
              <div className="stack-item">
                <span>Artificial Intelligence</span>
                <span>PERCEPTION / DECISION</span>
              </div>
              <div className="stack-item">
                <span>Computer Vision</span>
                <span>SENSING</span>
              </div>
              <div className="stack-item">
                <span>Autonomous Navigation</span>
                <span>ACTION</span>
              </div>
              <div className="stack-item">
                <span>Embedded Systems</span>
                <span>HARDWARE</span>
              </div>
              <div className="stack-item">
                <span>Edge &amp; Cloud Computing</span>
                <span>INFRASTRUCTURE</span>
              </div>
              <div className="stack-item">
                <span>Machine Learning</span>
                <span>ADAPTATION</span>
              </div>
            </div>
          </div>
          <div className="node-diagram reveal">
            <svg
              viewBox="0 0 480 420"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="240" cy="210" r="52" stroke="#3fe0a6" strokeWidth="1.2" />
              <circle cx="240" cy="210" r="5" fill="#3fe0a6" />
              <g stroke="#2a332d" strokeWidth="1">
                <line x1="240" y1="158" x2="240" y2="40" />
                <line x1="285" y1="180" x2="410" y2="100" />
                <line x1="292" y1="210" x2="440" y2="210" />
                <line x1="285" y1="240" x2="410" y2="320" />
                <line x1="240" y1="262" x2="240" y2="380" />
                <line x1="195" y1="240" x2="70" y2="320" />
                <line x1="188" y1="210" x2="40" y2="210" />
                <line x1="195" y1="180" x2="70" y2="100" />
              </g>
              <g fill="#050706" stroke="#3fe0a6" strokeWidth="1">
                <circle cx="240" cy="34" r="14" />
                <circle cx="416" cy="96" r="14" />
                <circle cx="446" cy="210" r="14" />
                <circle cx="416" cy="324" r="14" />
                <circle cx="240" cy="386" r="14" />
                <circle cx="64" cy="324" r="14" />
                <circle cx="34" cy="210" r="14" />
                <circle cx="64" cy="96" r="14" />
              </g>
              <text
                x="240"
                y="196"
                textAnchor="middle"
                fill="#f3f5f2"
                fontFamily="IBM Plex Mono"
                fontSize="10"
              >
                DURXAN
              </text>
              <text
                x="240"
                y="210"
                textAnchor="middle"
                fill="#8b968f"
                fontFamily="IBM Plex Mono"
                fontSize="9"
              >
                CORE
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section id="industries" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <h2 className="section-title">Built to operate across industries.</h2>
            <p className="section-note">
              Logistics. Manufacturing. Agriculture. Healthcare. Retail.
              Residential. Security. Defense. Enterprise. Infrastructure. Insurance
            </p>
          </div>
          <div className="frontier-tags reveal" style={{ gap: "12px" }}>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Logistics</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Manufacturing</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Agriculture</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Healthcare</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Retail</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Residential</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Security</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Defense</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Enterprise</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Infrastructure</span>
            <span style={{ fontSize: "13px", padding: "10px 16px" }}>Insurance</span>
          </div>
        </div>
      </section>

      {/* ABOUT / MISSION / VISION / LEADERSHIP */}
      <section id="company">
        <div className="wrap">
          <div className="section-head reveal">
            <h2 className="section-title">
              Building intelligence for the physical world.
            </h2>
            <p className="section-note">
              DURXAN's mission, vision, and the people leading its technology
              direction.
            </p>
          </div>

          <div className="mission-vision-grid reveal">
            <div className="mv-col">
              <div className="mv-num mono">01 — MISSION</div>
              <h3 className="mv-title">Mission</h3>
              <p className="mv-text">
                To build intelligent robots, autonomous systems, and software
                that transform how people, businesses, and organizations operate
                — engineered for the real world, not the demo stage.
              </p>
            </div>
            <div className="mv-col">
              <div className="mv-num mono">02 — VISION</div>
              <h3 className="mv-title">Vision</h3>
              <p className="mv-text">
                A future where intelligent machines and intelligent software
                work as one system — perceiving, deciding, and acting alongside
                the people and organizations they serve.
              </p>
            </div>
          </div>

          <div className="leadership reveal">
            <div className="eyebrow-mono">
              <span className="bar"></span>LEADERSHIP
            </div>
            <div className="leader-card">
              <div className="leader-portrait">
                <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="75" cy="75" r="60" stroke="#2a332d" strokeWidth="1" />
                  <circle
                    cx="75"
                    cy="75"
                    r="60"
                    stroke="#3fe0a6"
                    strokeWidth="1.2"
                    strokeDasharray="6 340"
                  />
                  <text
                    x="75"
                    y="86"
                    textAnchor="middle"
                    fill="#f3f5f2"
                    fontFamily="Space Grotesk"
                    fontWeight="600"
                    fontSize="34"
                  >
                    DD
                  </text>
                </svg>
              </div>
              <div className="leader-info">
                <div className="leader-name">David Augustine Duncan</div>
                <div className="leader-title mono">
                  FOUNDER &amp; CHIEF EXECUTIVE OFFICER
                </div>
                <p className="leader-bio">
                  David founded DURXAN to bring intelligent machines and
                  intelligent software together under a single engineering
                  discipline. He sets the company's technology direction across
                  robotics, autonomous systems, and software, and leads DURXAN's
                  growth into new industries and markets.
                </p>
                <div className="leader-links">
                  <a href="#" className="leader-link" data-hover>
                    LinkedIn
                  </a>
                  <Link href="/#contact" className="leader-link" data-hover>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement">
        <div className="wrap">
          <div className="reveal">
            <p className="statement-text">
              From software to machines.
              <br />
              From <em>intelligence</em> to action.
            </p>
            <p className="statement-sub">
              DURXAN — INTELLIGENCE, ENGINEERED FOR THE REAL WORLD
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact" style={{ padding: 0 }}>
        <div className="wrap cta-inner">
          <h2 className="cta-title reveal">Let's build the future.</h2>
          <Link href="/#contact" className="btn btn-solid" data-hover>
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-col">
              <Link href="/" className="logo">
                <span className="dot"></span>DURXAN
              </Link>
              <p className="footer-brand-desc">
                Intelligence, engineered for the real world. Robotics,
                autonomous systems, and software.
              </p>
            </div>
            <div className="footer-col">
              <h4>DIVISIONS</h4>
              <Link href="/robotics">Robotics</Link>
              <Link href="/autonomous">Autonomous Systems</Link>
              <Link href="/software">Software</Link>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <Link href="/#company">About</Link>
              <Link href="/#careers">Careers</Link>
            </div>
            <div className="footer-col">
              <h4>RESOURCES</h4>
              <Link href="/#insights">Insights</Link>
              <Link href="/#industries">Industries</Link>
              <Link href="#">Documentation</Link>
            </div>
            <div className="footer-col">
              <h4>CONNECT</h4>
              <Link href="/#contact">Contact</Link>
              <a href="#">LinkedIn</a>
              <a href="#">X / Twitter</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 DURXAN. All rights reserved.</span>
            <span>ENGINEERED FOR THE REAL WORLD</span>
          </div>
        </div>
      </footer>
    </>
  );
}