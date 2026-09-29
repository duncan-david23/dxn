"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ---------------- AUTONOMOUS PLATFORMS ---------------- */
const platforms = [
  {
    index: "01",
    name: "Skyward A2",
    category: "AERIAL / DELIVERY",
    tagline: "Autonomous aerial delivery at city scale.",
    description:
      "Multi-rotor delivery drone engineered for urban and suburban logistics. Fully autonomous flight paths, precision payload drop, and BVLOS operation under supervisory control.",
    features: [
      "BVLOS autonomous flight",
      "Precision payload drop",
      "Weatherproof IP54 airframe",
      "Automated airspace deconfliction",
      "Fleet-managed mission planning",
      "45-minute flight endurance",
    ],
    specs: [
      { label: "PAYLOAD", value: "6 kg" },
      { label: "RANGE", value: "40 km" },
      { label: "CRUISE", value: "72 km/h" },
      { label: "ENDURANCE", value: "45 min" },
    ],
    status: "RESEARCH & DEVELOPMENT",
  },
  {
    index: "02",
    name: "Sentinel U1",
    category: "DEFENSE & SECURITY",
    tagline: "Persistent surveillance for critical zones.",
    description:
      "Fixed-wing surveillance UAV with long-endurance flight, multi-sensor payload, and encrypted real-time video relay. Built for border, perimeter, and critical infrastructure monitoring.",
    features: [
      "Fixed-wing long endurance",
      "Thermal & EO/IR sensors",
      "Encrypted comms relay",
      "Autonomous patrol patterns",
      "Automatic threat flagging",
      "Launch-from-anywhere design",
    ],
    specs: [
      { label: "ENDURANCE", value: "14 hrs" },
      { label: "CEILING", value: "5.5 km" },
      { label: "RANGE", value: "180 km" },
      { label: "PAYLOAD", value: "3 kg" },
    ],
    status: "RESEARCH & DEVELOPMENT",
  },
  {
    index: "03",
    name: "Roamer G7",
    category: "GROUND / LOGISTICS",
    tagline: "All-terrain autonomy for the last mile.",
    description:
      "Autonomous ground vehicle for logistics, inspection, and industrial patrol. Handles urban, warehouse, and off-road environments with a single unified autonomy stack.",
    features: [
      "Urban & off-road autonomy",
      "Modular cargo / sensor bay",
      "Wireless & wired charging",
      "V2X-capable comms",
      "Indoor-outdoor transition",
      "8-hour continuous duty",
    ],
    specs: [
      { label: "PAYLOAD", value: "180 kg" },
      { label: "SPEED", value: "25 km/h" },
      { label: "RANGE", value: "90 km" },
      { label: "GRADEABILITY", value: "35°" },
    ],
    status: "RESEARCH & DEVELOPMENT",
  },
  {
    index: "04",
    name: "Aegis Swarm",
    category: "COORDINATED AUTONOMY",
    tagline: "Many platforms. One mission.",
    description:
      "Coordinated multi-platform autonomy — air, ground, and static sensors working as a single distributed system. Central command, decentralized execution.",
    features: [
      "Multi-platform coordination",
      "Distributed decision-making",
      "Mesh comms & relay",
      "Mission-level autonomy",
      "Edge AI sensor fusion",
      "Graceful degradation modes",
    ],
    specs: [
      { label: "PLATFORMS", value: "16+" },
      { label: "LATENCY", value: "< 80 ms" },
      { label: "MESH RANGE", value: "12 km" },
      { label: "UPTIME", value: "99.7%" },
    ],
    status: "RESEARCH & DEVELOPMENT",
  },
];

/* ---------------- CAPABILITIES ---------------- */
const capabilities = [
  {
    label: "Autonomous Flight",
    detail:
      "BVLOS flight planning, geofencing, and dynamic re-routing under supervisory control.",
  },
  {
    label: "Ground Autonomy",
    detail:
      "Urban, warehouse, and off-road navigation with unified perception and planning.",
  },
  {
    label: "Sensor Fusion",
    detail:
      "EO/IR, LiDAR, radar, and acoustic sensing fused into a single mission picture.",
  },
  {
    label: "Encrypted Comms",
    detail:
      "End-to-end encrypted telemetry, video relay, and mesh fallback links.",
  },
  {
    label: "Human Supervision",
    detail:
      "Mission control with clear handoff — autonomy that respects the operator.",
  },
  {
    label: "Fleet Operations",
    detail:
      "Mission planning, telemetry, OTA updates, and lifecycle management at scale.",
  },
];

/* ---------------- TECH STACK ---------------- */
const stack = [
  { label: "Flight Control", value: "TRIPLE-REDUNDANT" },
  { label: "Autonomy Core", value: "EDGE AI" },
  { label: "Operating System", value: "DURXAN OS" },
  { label: "Comms", value: "AES-256 MESH" },
  { label: "Ground Station", value: "SECURE MISSION" },
  { label: "Compliance", value: "BVLOS-READY" },
];

const stats = [
  { value: "4", label: "AUTONOMOUS PLATFORMS" },
  { value: "180K+", label: "AUTONOMOUS FLIGHT HOURS" },
  { value: "35+", label: "OPERATING COUNTRIES" },
  { value: "99.5%", label: "MISSION SUCCESS" },
];

export default function AutonomousClient() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock body scroll + auto-close on desktop resize
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

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
        * { margin: 0; padding: 0; box-sizing: border-box; }
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
        ::selection { background: var(--emerald-dim); color: var(--emerald-bright); }

        a { color: inherit; text-decoration: none; }
        img, svg { display: block; max-width: 100%; }
        .mono { font-family: var(--font-mono); }
        .wrap { max-width: 1360px; margin: 0 auto; padding: 0 48px; }
        @media (max-width: 900px) { .wrap { padding: 0 24px; } }
        @media (max-width: 480px) { .wrap { padding: 0 18px; } }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 999;
          opacity: 0.035; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ---------- NAV ---------- */
        header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 500;
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
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px;
        }
        .logo {
          font-family: var(--font-head); font-weight: 700; font-size: 20px;
          letter-spacing: 0.04em; display: flex; align-items: center; gap: 9px;
          flex-shrink: 0;
        }
        .logo .dot {
          width: 7px; height: 7px; background: var(--emerald-bright); border-radius: 50%;
          box-shadow: 0 0 12px 2px rgba(63, 224, 166, 0.6);
        }
        nav.primary { display: flex; gap: 36px; }
        nav.primary a {
          font-size: 13.5px; color: var(--gray); letter-spacing: 0.01em;
          position: relative; padding: 4px 0; transition: color 0.25s ease;
        }
        nav.primary a:hover { color: var(--white); }
        nav.primary a::after {
          content: ""; position: absolute; left: 0; bottom: 0; height: 1px; width: 0;
          background: var(--emerald-bright); transition: width 0.3s ease;
        }
        nav.primary a:hover::after { width: 100%; }
        .nav-cta {
          font-size: 13px; padding: 11px 22px;
          border: 1px solid var(--line-strong); border-radius: 2px;
          transition: border-color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }
        .nav-cta:hover {
          border-color: var(--emerald-bright);
          background: rgba(63, 224, 166, 0.06);
        }
        .burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; z-index: 600;
          padding: 8px; margin: -8px;
          background: transparent; border: none;
          flex-shrink: 0;
        }
        .burger span {
          width: 26px; height: 1px; background: var(--white);
          display: block; transition: 0.3s;
        }
        .burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity: 0; }
        .burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        @media (max-width: 900px) {
          nav.primary, .nav-cta { display: none; }
          .burger { display: flex; }
        }

        /* mobile menu — scrollable */
        .mobile-menu {
          position: fixed; inset: 0; background: var(--bg); z-index: 490;
          display: flex; flex-direction: column; justify-content: flex-start;
          padding: 100px 24px 40px;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(0.7, 0, 0.2, 1);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mobile-menu.open { transform: translateY(0); }
        .mobile-menu a {
          font-family: var(--font-head); font-size: 32px; font-weight: 600;
          padding: 16px 0; border-bottom: 1px solid var(--line);
          color: var(--white); line-height: 1.1; flex-shrink: 0;
        }
        .mobile-menu .mm-contact {
          margin-top: 28px; color: var(--emerald-bright);
          font-family: var(--font-mono); font-size: 15px;
          border-bottom: none;
        }
        @media (max-width: 480px) {
          .mobile-menu { padding: 88px 20px 32px; }
          .mobile-menu a { font-size: 26px; padding: 14px 0; }
        }
        @media (max-width: 360px) {
          .mobile-menu a { font-size: 22px; }
        }

        /* ---------- HERO ---------- */
        .page-hero {
          position: relative; padding: 200px 0 120px; overflow: hidden;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 900px) { .page-hero { padding: 150px 0 80px; } }
        @media (max-width: 480px) { .page-hero { padding: 130px 0 64px; } }
        .page-hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background: radial-gradient(
              ellipse 60% 50% at 80% 20%,
              rgba(31, 174, 122, 0.14), transparent 60%
            ),
            radial-gradient(
              ellipse 70% 60% at 10% 90%,
              rgba(18, 22, 19, 0.9), transparent 70%
            ),
            linear-gradient(180deg, #050706 0%, #060907 60%, #050706 100%);
        }
        .page-hero-grid {
          position: absolute; inset: 0; z-index: 1; opacity: 0.4;
          background-image: linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(
            ellipse 70% 60% at 50% 40%, black, transparent 75%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 70% 60% at 50% 40%, black, transparent 75%
          );
        }
        .page-hero-inner { position: relative; z-index: 2; }
        .eyebrow-mono {
          font-family: var(--font-mono); font-size: 12.5px; color: var(--gray);
          letter-spacing: 0.06em; display: flex; align-items: center; gap: 10px;
          flex-wrap: wrap;
        }
        .eyebrow-mono .bar {
          width: 26px; height: 1px; background: var(--emerald); display: inline-block;
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .eyebrow-mono { font-size: 10.5px; letter-spacing: 0.04em; }
        }
        .page-title {
          font-family: var(--font-head); font-weight: 700;
          font-size: clamp(42px, 9vw, 128px); line-height: 0.96;
          letter-spacing: -0.025em; margin-top: 28px; max-width: 1200px;
          word-break: break-word;
        }
        @media (max-width: 480px) {
          .page-title { font-size: clamp(36px, 11vw, 64px); }
        }
        .page-title em { color: var(--emerald-bright); font-style: normal; }
        .page-lede {
          margin-top: 40px; max-width: 680px; color: var(--gray);
          font-size: 17px; line-height: 1.65;
        }
        @media (max-width: 480px) {
          .page-lede { font-size: 15px; margin-top: 28px; }
        }
        .page-hero-meta {
          display: flex; gap: 56px; margin-top: 64px; flex-wrap: wrap;
          padding-top: 40px; border-top: 1px solid var(--line);
        }
        @media (max-width: 900px) {
          .page-hero-meta { gap: 32px; margin-top: 48px; padding-top: 28px; }
        }
        @media (max-width: 480px) {
          .page-hero-meta { gap: 24px; margin-top: 32px; }
        }
        .phm-item { min-width: 0; }
        .phm-item .phm-val {
          font-family: var(--font-head); font-weight: 600;
          font-size: 28px; letter-spacing: -0.01em;
        }
        @media (max-width: 480px) {
          .phm-item .phm-val { font-size: 22px; }
        }
        .phm-item .phm-label {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--gray-dim); letter-spacing: 0.06em; margin-top: 8px;
        }
        @media (max-width: 480px) {
          .phm-item .phm-label { font-size: 9.5px; }
        }

        /* ---------- SECTION SHARED ---------- */
        section { position: relative; padding: 130px 0; }
        @media (max-width: 900px) { section { padding: 90px 0; } }
        @media (max-width: 480px) { section { padding: 72px 0; } }
        .section-head {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 40px; margin-bottom: 72px; flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .section-head { margin-bottom: 48px; gap: 20px; }
        }
        .section-title {
          font-family: var(--font-head); font-weight: 600;
          font-size: clamp(28px, 4.4vw, 54px); letter-spacing: -0.01em;
          line-height: 1.08; max-width: 720px;
        }
        .section-note {
          max-width: 340px; color: var(--gray);
          font-size: 14.5px; line-height: 1.6;
        }
        .section-label {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--emerald-bright); letter-spacing: 0.08em;
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .section-label .bar {
          width: 26px; height: 1px; background: var(--emerald);
          display: inline-block;
        }

        /* ---------- PLATFORMS ---------- */
        .platforms-section { border-bottom: 1px solid var(--line); }
        .platform-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
          background: var(--line); border: 1px solid var(--line);
        }
        .platform-card {
          background: var(--bg); padding: 48px 44px 44px;
          display: flex; flex-direction: column; position: relative;
          overflow: hidden; transition: background 0.4s ease;
        }
        .platform-card:hover { background: #070a08; }
        .platform-card:hover .platform-glow { opacity: 1; }
        .platform-glow {
          position: absolute; top: -30%; right: -30%; width: 60%; height: 60%;
          border-radius: 50%;
          background: radial-gradient(
            circle, rgba(31, 174, 122, 0.18), transparent 70%
          );
          opacity: 0; transition: opacity 0.5s ease;
          pointer-events: none; z-index: 0;
        }
        .platform-card > * { position: relative; z-index: 1; }
        .platform-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 28px; gap: 12px; flex-wrap: wrap;
        }
        .platform-index {
          font-family: var(--font-mono); color: var(--gray-dim); font-size: 13px;
        }
        .platform-cat {
          font-family: var(--font-mono); font-size: 10.5px;
          color: var(--emerald-bright); letter-spacing: 0.08em;
          border: 1px solid var(--emerald-dim);
          padding: 5px 10px; border-radius: 2px;
          background: rgba(31, 174, 122, 0.06);
          white-space: nowrap;
        }
        .platform-name {
          font-family: var(--font-head); font-weight: 700;
          font-size: clamp(28px, 3vw, 38px); letter-spacing: -0.02em;
          line-height: 1;
          word-break: break-word;
        }
        .platform-tagline {
          font-family: var(--font-head); font-weight: 500;
          font-size: 15px; color: var(--emerald-bright);
          margin-top: 12px; letter-spacing: -0.005em;
        }
        .platform-desc {
          color: var(--gray); font-size: 14.5px; line-height: 1.65;
          margin-top: 20px; max-width: 480px;
        }
        .platform-features {
          list-style: none; margin-top: 28px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }
        .platform-features li {
          font-family: var(--font-mono); font-size: 11.5px;
          color: var(--gray); display: flex; align-items: center; gap: 10px;
        }
        .platform-features li::before {
          content: ""; width: 5px; height: 5px;
          background: var(--emerald-bright); border-radius: 50%; flex: none;
        }
        .spec-sheet {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--line);
          border: 1px solid var(--line);
          margin-top: 32px;
        }
        .spec-cell {
          background: var(--bg); padding: 16px 12px;
          display: flex; flex-direction: column; gap: 6px;
          min-width: 0;
        }
        .spec-label {
          font-family: var(--font-mono); font-size: 10px;
          color: var(--gray-dim); letter-spacing: 0.06em;
        }
        .spec-value {
          font-family: var(--font-head); font-weight: 600;
          font-size: 15px; letter-spacing: -0.005em;
        }
        .platform-footer {
          margin-top: 32px; padding-top: 22px;
          border-top: 1px solid var(--line);
          display: flex; justify-content: space-between;
          align-items: center; gap: 12px; flex-wrap: wrap;
          font-family: var(--font-mono); font-size: 11.5px;
          color: var(--gray-dim); letter-spacing: 0.05em;
        }
        .platform-status {
          display: flex; align-items: center; gap: 8px;
          color: var(--emerald-bright);
        }
        .platform-status::before {
          content: ""; width: 6px; height: 6px;
          background: var(--emerald-bright); border-radius: 50%;
          box-shadow: 0 0 8px 2px rgba(63, 224, 166, 0.6);
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .platform-grid { grid-template-columns: 1fr; }
          .platform-card { padding: 36px 28px; }
          .platform-features { grid-template-columns: 1fr; }
          .spec-sheet { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .platform-card { padding: 28px 20px; }
          .platform-features li { font-size: 11px; }
          .spec-cell { padding: 12px 10px; }
          .spec-value { font-size: 13.5px; }
        }

        /* ---------- CAPABILITIES ---------- */
        .cap-section { background: var(--panel); border-bottom: 1px solid var(--line); }
        .cap-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--line); border: 1px solid var(--line);
        }
        .cap-cell {
          background: var(--bg); padding: 40px 36px;
          min-height: 200px; transition: background 0.4s ease;
        }
        .cap-cell:hover { background: #070a08; }
        .cap-cell:hover .cap-bar { width: 56px; }
        .cap-bar {
          width: 26px; height: 2px; background: var(--emerald-bright);
          transition: width 0.4s ease; margin-bottom: 22px;
        }
        .cap-label {
          font-family: var(--font-head); font-weight: 600;
          font-size: 19px; letter-spacing: -0.01em;
        }
        .cap-detail {
          color: var(--gray); font-size: 14px;
          line-height: 1.65; margin-top: 14px;
        }
        @media (max-width: 960px) { .cap-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .cap-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) {
          .cap-cell { padding: 32px 24px; min-height: auto; }
        }

        /* ---------- STATS BAND ---------- */
        .stats-band {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--graphite);
        }
        .stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--line);
        }
        .stat-cell { background: var(--graphite); padding: 56px 36px; }
        .stat-val {
          font-family: var(--font-head); font-weight: 700;
          font-size: clamp(34px, 4vw, 52px);
          letter-spacing: -0.02em; color: var(--emerald-bright);
        }
        .stat-label {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--gray); letter-spacing: 0.06em; margin-top: 14px;
        }
        @media (max-width: 760px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-cell { padding: 40px 24px; }
        }
        @media (max-width: 480px) {
          .stat-cell { padding: 32px 20px; }
          .stat-val { font-size: 32px; }
        }

        /* ---------- ARCHITECTURE ---------- */
        .arch-section .wrap {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        @media (max-width: 960px) {
          .arch-section .wrap { grid-template-columns: 1fr; gap: 48px; }
        }
        .arch-copy p {
          color: var(--gray); font-size: 15.5px; line-height: 1.7;
          max-width: 440px; margin-top: 22px;
        }
        .arch-list {
          margin-top: 34px; display: flex; flex-direction: column;
        }
        .arch-item {
          display: flex; justify-content: space-between;
          padding: 16px 0; border-bottom: 1px solid var(--line);
          font-family: var(--font-mono); font-size: 13px; color: var(--gray);
          gap: 12px;
        }
        .arch-item span:last-child {
          color: var(--gray-dim);
          text-align: right;
        }
        @media (max-width: 480px) {
          .arch-item { font-size: 11.5px; }
        }
        .arch-visual {
          position: relative; aspect-ratio: 1 / 0.85;
          max-width: 520px;
          margin: 0 auto;
          width: 100%;
        }

        /* ---------- CTA (kept for reuse) ---------- */
        .cta-section {
          background: var(--graphite); border-top: 1px solid var(--line);
          text-align: center; padding: 130px 0;
        }
        @media (max-width: 900px) { .cta-section { padding: 90px 0; } }
        @media (max-width: 480px) { .cta-section { padding: 72px 0; } }
        .cta-title {
          font-family: var(--font-head); font-weight: 600;
          font-size: clamp(30px, 5.4vw, 68px); letter-spacing: -0.02em;
          line-height: 1.05; max-width: 900px; margin: 0 auto;
        }
        .cta-title em { color: var(--emerald-bright); font-style: normal; }
        .cta-sub {
          color: var(--gray); font-size: 16px; line-height: 1.65;
          max-width: 560px; margin: 28px auto 0;
        }
        .cta-actions {
          display: flex; gap: 14px; justify-content: center;
          margin-top: 44px; flex-wrap: wrap;
          padding: 0 24px;
        }
        .btn {
          font-size: 13.5px; padding: 15px 28px; border-radius: 2px;
          font-family: var(--font-body); font-weight: 500;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
            background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          display: inline-block;
          text-align: center;
          white-space: nowrap;
          flex: 0 0 auto;
        }
        @media (max-width: 480px) {
          .cta-actions .btn {
            flex: 1 1 100%;
            padding: 14px 20px;
          }
        }
        .btn-solid { background: var(--white); color: var(--bg); }
        .btn-solid:hover {
          background: var(--emerald-bright); transform: translateY(-2px);
        }
        .btn-ghost { border: 1px solid var(--line-strong); }
        .btn-ghost:hover {
          border-color: var(--emerald-bright);
          color: var(--emerald-bright); transform: translateY(-2px);
        }

        /* ---------- FOOTER ---------- */
        footer { padding: 70px 0 40px; border-top: 1px solid var(--line); }
        @media (max-width: 900px) { footer { padding: 50px 0 30px; } }
        .footer-top {
          display: grid; grid-template-columns: 1.4fr repeat(4, 1fr);
          gap: 40px; padding-bottom: 60px;
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
          .footer-top { grid-template-columns: 1fr; gap: 28px; }
        }
        .footer-col h4 {
          font-family: var(--font-mono); font-size: 11.5px;
          color: var(--gray-dim); letter-spacing: 0.06em; margin-bottom: 18px;
        }
        .footer-col a {
          display: block; font-size: 14px; color: var(--gray);
          padding: 6px 0; transition: color 0.25s ease;
        }
        .footer-col a:hover { color: var(--white); }
        .footer-brand-desc {
          color: var(--gray); font-size: 14px; max-width: 280px;
          line-height: 1.6; margin-top: 16px;
        }
        .footer-bottom {
          display: flex; justify-content: space-between; padding-top: 28px;
          color: var(--gray-dim); font-size: 12.5px;
          font-family: var(--font-mono); flex-wrap: wrap; gap: 12px;
        }
        @media (max-width: 480px) {
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="grain"></div>

      {/* NAV */}
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
          <Link href="/#contact" className="nav-cta">
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
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-grid"></div>
        <div className="wrap page-hero-inner">
          <div className="eyebrow-mono">
            <span className="bar"></span>DIVISION 02 — AUTONOMOUS SYSTEMS
          </div>
          <h1 className="page-title">
            Autonomy,
            <br />
            <em>under</em> supervision.
          </h1>
          <p className="page-lede">
            DURXAN Autonomous Systems builds intelligent aerial and ground
            platforms — drones, delivery fleets, defense and security systems —
            engineered to operate with increasing levels of autonomy under
            human supervision.
          </p>
          <div className="page-hero-meta">
            <div className="phm-item">
              <div className="phm-val">4</div>
              <div className="phm-label">AUTONOMOUS PLATFORMS</div>
            </div>
            <div className="phm-item">
              <div className="phm-val">180K+</div>
              <div className="phm-label">AUTONOMOUS FLIGHT HOURS</div>
            </div>
            <div className="phm-item">
              <div className="phm-val">35+</div>
              <div className="phm-label">OPERATING COUNTRIES</div>
            </div>
            <div className="phm-item">
              <div className="phm-val">99.5%</div>
              <div className="phm-label">MISSION SUCCESS</div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="platforms-section" id="platforms">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-label">
                <span className="bar"></span>AUTONOMOUS PLATFORMS
              </div>
              <h2 className="section-title">
                Air, ground, and coordinated autonomy.
              </h2>
            </div>
            <p className="section-note">
              Every platform shares the same autonomy core — tuned to its
              domain, mission, and threat environment.
            </p>
          </div>

          <div className="platform-grid">
            {platforms.map((p) => (
              <article key={p.name} className="platform-card">
                <div className="platform-glow"></div>
                <div className="platform-top">
                  <div className="platform-index">{p.index}</div>
                  <div className="platform-cat">{p.category}</div>
                </div>
                <h3 className="platform-name">{p.name}</h3>
                <p className="platform-tagline">{p.tagline}</p>
                <p className="platform-desc">{p.description}</p>

                <ul className="platform-features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div className="spec-sheet">
                  {p.specs.map((s) => (
                    <div key={s.label} className="spec-cell">
                      <span className="spec-label">{s.label}</span>
                      <span className="spec-value">{s.value}</span>
                    </div>
                  ))}
                </div>

                <div className="platform-footer">
                  <span>STATUS</span>
                  <span className="platform-status">{p.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="stats-band" style={{ padding: 0 }}>
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-cell">
              <div className="stat-val">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="cap-section" id="capabilities">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-label">
                <span className="bar"></span>CORE CAPABILITIES
              </div>
              <h2 className="section-title">
                What every DURXAN platform can do.
              </h2>
            </div>
            <p className="section-note">
              Six engineering disciplines, one unified autonomy stack.
            </p>
          </div>
          <div className="cap-grid">
            {capabilities.map((c) => (
              <div key={c.label} className="cap-cell">
                <div className="cap-bar"></div>
                <div className="cap-label">{c.label}</div>
                <p className="cap-detail">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="arch-section" id="architecture">
        <div className="wrap">
          <div className="arch-copy">
            <div className="section-label">
              <span className="bar"></span>ARCHITECTURE
            </div>
            <h2 className="section-title">Built on DURXAN OS.</h2>
            <p>
              Every platform runs on the same autonomy core — from flight
              control up through sensor fusion, mission planning, and secure
              fleet operations.
            </p>
            <div className="arch-list">
              {stack.map((s) => (
                <div key={s.label} className="arch-item">
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="arch-visual">
            <svg
              viewBox="0 0 480 420"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="240" cy="210" r="180" stroke="#141a16" strokeWidth="1" />
              <circle cx="240" cy="210" r="140" stroke="#1a201c" strokeWidth="1" />
              <circle cx="240" cy="210" r="100" stroke="#2a332d" strokeWidth="1" />
              <circle
                cx="240"
                cy="210"
                r="100"
                stroke="#3fe0a6"
                strokeWidth="1.2"
                strokeDasharray="4 620"
              />
              <circle cx="240" cy="210" r="52" stroke="#3fe0a6" strokeWidth="1.2" />
              <circle cx="240" cy="210" r="5" fill="#3fe0a6" />

              <g stroke="#2a332d" strokeWidth="1">
                <line x1="240" y1="158" x2="240" y2="30" />
                <line x1="285" y1="180" x2="410" y2="100" />
                <line x1="292" y1="210" x2="440" y2="210" />
                <line x1="285" y1="240" x2="410" y2="320" />
                <line x1="240" y1="262" x2="240" y2="390" />
                <line x1="195" y1="240" x2="70" y2="320" />
                <line x1="188" y1="210" x2="40" y2="210" />
                <line x1="195" y1="180" x2="70" y2="100" />
              </g>

              <g fill="#050706" stroke="#3fe0a6" strokeWidth="1">
                <circle cx="240" cy="24" r="14" />
                <circle cx="416" cy="96" r="14" />
                <circle cx="446" cy="210" r="14" />
                <circle cx="416" cy="324" r="14" />
                <circle cx="240" cy="396" r="14" />
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
                AUTONOMY
              </text>
            </svg>
          </div>
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
              <h4>PLATFORMS</h4>
              <a href="#platforms">Skyward A2</a>
              <a href="#platforms">Sentinel U1</a>
              <a href="#platforms">Roamer G7</a>
              <a href="#platforms">Aegis Swarm</a>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <Link href="/#company">About</Link>
              <Link href="/#careers">Careers</Link>
            </div>
            <div className="footer-col">
              <h4>CONNECT</h4>
              <Link href="/#contact">Contact</Link>
              <a href="#">LinkedIn</a>
              <a href="#">X / Twitter</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DURXAN. All rights reserved.</span>
            <span>ENGINEERED FOR THE REAL WORLD</span>
          </div>
        </div>
      </footer>
    </>
  );
}