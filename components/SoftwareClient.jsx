"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const products = [
  {
    index: "01",
    name: "ClaukkInventory",
    category: "INVENTORY MANAGEMENT",
    tagline: "Know what you have. Everywhere. Always.",
    description:
      "Real-time inventory system for retail, warehouse, and multi-location businesses. Sync stock across stores, track movements, automate reordering, and reconcile with your books.",
    features: [
      "Multi-location stock sync",
      "Barcode & RFID scanning",
      "Automated reorder triggers",
      "Supplier & PO management",
      "Real-time valuation reports",
      "Accounting integration",
    ],
    audience: "Retail / Warehouse / Distribution",
    cta: "View",
    externalUrl: "#",
    externalLabel: "claukkinventory.app",
  },
];

const clientProjects = [
  {
    index: "01",
    client: "Havenport Health",
    sector: "HEALTHCARE",
    region: "NORTH AMERICA",
    app: "CareBridge",
    type: "Patient Management System",
    description:
      "HIPAA-compliant patient records and appointment platform serving 40+ clinics with integrated telehealth, e-prescriptions, and insurance verification.",
    stack: ["Next.js", "Python", "AWS", "HL7 FHIR"],
    duration: "11 months",
    status: "LIVE",
  },
];

const services = [
  {
    label: "Product Engineering",
    detail:
      "Full-stack teams building web, mobile, and desktop applications from concept to launch.",
  },
  {
    label: "API & Platform Development",
    detail:
      "Scalable APIs, microservices, and platform architecture built for high-volume operations.",
  },
  {
    label: "Data & Analytics",
    detail:
      "Data pipelines, warehouses, dashboards, and ML models that turn raw data into decisions.",
  },
  {
    label: "Security & Compliance",
    detail:
      "SOC 2, HIPAA, ISO 27001-ready systems with zero-trust architecture baked in.",
  },
  {
    label: "Legacy Modernization",
    detail:
      "Migrating and rebuilding aging systems into modern, maintainable, cloud-native platforms.",
  },
  {
    label: "Cloud & DevOps",
    detail:
      "Cloud architecture, CI/CD, infrastructure-as-code, and 24/7 reliability engineering.",
  },
];

const stats = [
  { value: "1", label: "DURXAN PRODUCTS" },
  { value: "1", label: "CLIENT PROJECTS SHIPPED" },
  { value: "1", label: "COUNTRIES SERVED" },
  { value: "99.99%", label: "PLATFORM UPTIME" },
];

export default function SoftwareClient() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open + auto-close on desktop resize
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

        /* ---------- NAV (fixed on scroll, like landing) ---------- */
        .topnav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 500;
          padding: 26px 0;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, padding 0.4s ease,
            border-color 0.4s ease, backdrop-filter 0.4s ease;
        }
        .topnav.scrolled {
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

        /* burger */
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

        /* PAGE HERO */
        .page-hero {
          position: relative; padding: 200px 0 120px; overflow: hidden;
          border-bottom: 1px solid var(--line);
        }
        @media (max-width: 900px) {
          .page-hero { padding: 150px 0 80px; }
        }
        @media (max-width: 480px) {
          .page-hero { padding: 130px 0 64px; }
        }
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

        /* SECTION SHARED */
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

        /* ---- DURXAN PRODUCTS ---- */
        .products-section { border-bottom: 1px solid var(--line); }
        .product-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
          background: var(--line); border: 1px solid var(--line);
        }
        .product-card {
          background: var(--bg); padding: 48px 44px 44px;
          display: flex; flex-direction: column; position: relative;
          overflow: hidden; transition: background 0.4s ease;
        }
        .product-card:hover { background: #070a08; }
        .product-card:hover .product-glow { opacity: 1; }
        .product-glow {
          position: absolute; top: -30%; right: -30%; width: 60%; height: 60%;
          border-radius: 50%;
          background: radial-gradient(
            circle, rgba(31, 174, 122, 0.18), transparent 70%
          );
          opacity: 0; transition: opacity 0.5s ease;
          pointer-events: none; z-index: 0;
        }
        .product-card > * { position: relative; z-index: 1; }
        .product-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 28px; gap: 12px; flex-wrap: wrap;
        }
        .product-index {
          font-family: var(--font-mono); color: var(--gray-dim); font-size: 13px;
        }
        .product-cat {
          font-family: var(--font-mono); font-size: 10.5px;
          color: var(--emerald-bright); letter-spacing: 0.08em;
          border: 1px solid var(--emerald-dim);
          padding: 5px 10px; border-radius: 2px;
          background: rgba(31, 174, 122, 0.06);
          white-space: nowrap;
        }
        .product-name {
          font-family: var(--font-head); font-weight: 700;
          font-size: clamp(28px, 3vw, 38px); letter-spacing: -0.02em;
          line-height: 1;
          word-break: break-word;
        }
        .product-tagline {
          font-family: var(--font-head); font-weight: 500;
          font-size: 15px; color: var(--emerald-bright);
          margin-top: 12px; letter-spacing: -0.005em;
        }
        .product-desc {
          color: var(--gray); font-size: 14.5px; line-height: 1.65;
          margin-top: 20px; max-width: 480px;
        }
        .product-features {
          list-style: none; margin-top: 28px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }
        .product-features li {
          font-family: var(--font-mono); font-size: 11.5px;
          color: var(--gray); display: flex; align-items: center; gap: 10px;
        }
        .product-features li::before {
          content: ""; width: 5px; height: 5px;
          background: var(--emerald-bright); border-radius: 50%; flex: none;
        }
        .product-bottom {
          margin-top: auto; padding-top: 32px;
          display: flex; justify-content: flex-end;
          align-items: center;
        }
        .product-cta {
          font-size: 13px; padding: 13px 26px; border-radius: 2px;
          background: var(--white); color: var(--bg);
          font-weight: 500; white-space: nowrap;
          transition: background 0.3s ease, transform 0.3s ease;
          display: inline-flex; align-items: center; gap: 8px;
          flex: 0 0 auto;
          max-width: 100%;
        }
        .product-cta:hover {
          background: var(--emerald-bright); transform: translateY(-2px);
        }
        .product-cta .arrow { transition: transform 0.3s ease; }
        .product-cta:hover .arrow { transform: translate(4px, -4px); }
        .product-audience {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--gray-dim); letter-spacing: 0.05em;
          margin-top: 20px; padding-top: 20px;
          border-top: 1px solid var(--line);
          display: flex; justify-content: space-between;
          align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .product-external {
          color: var(--emerald-bright);
          display: inline-flex; align-items: center; gap: 6px;
          word-break: break-all;
        }
        .product-external::before {
          content: "";
          width: 5px; height: 5px; background: var(--emerald-bright);
          border-radius: 50%;
          flex-shrink: 0;
        }
        @media (max-width: 860px) {
          .product-grid { grid-template-columns: 1fr; }
          .product-card { padding: 36px 28px; }
          .product-features { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .product-card { padding: 28px 20px; }
          .product-bottom { justify-content: stretch; }
          .product-cta { width: 100%; justify-content: center; }
        }

        /* ---- CLIENT PROJECTS ---- */
        .clients-section { background: var(--panel); }
        .project-list {
          display: flex; flex-direction: column;
          border-top: 1px solid var(--line);
        }
        .project-row {
          display: grid;
          grid-template-columns: 70px 1fr 1.2fr;
          gap: 44px; padding: 52px 0;
          border-bottom: 1px solid var(--line);
          transition: background 0.4s ease, padding 0.4s ease;
        }
        .project-row:hover {
          background: rgba(31, 174, 122, 0.025);
          padding-left: 20px; padding-right: 20px;
        }
        .project-index {
          font-family: var(--font-mono); color: var(--gray-dim);
          font-size: 14px; padding-top: 6px;
        }
        .project-client {
          font-family: var(--font-mono); font-size: 11.5px;
          color: var(--gray); letter-spacing: 0.06em;
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap;
        }
        .project-client::before {
          content: ""; width: 5px; height: 5px;
          background: var(--emerald-bright); border-radius: 50%; flex: none;
        }
        .project-app {
          font-family: var(--font-head); font-weight: 700;
          font-size: clamp(26px, 3vw, 36px); letter-spacing: -0.02em;
          line-height: 1.05; margin-top: 16px;
          word-break: break-word;
        }
        .project-type {
          color: var(--gray); font-size: 14px; margin-top: 12px;
        }
        .project-region {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--gray-dim); letter-spacing: 0.05em;
          margin-top: 18px;
        }
        .project-right { padding-top: 4px; }
        .project-desc {
          color: var(--gray); font-size: 15px;
          line-height: 1.7; max-width: 540px;
        }
        .project-stack {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px;
        }
        .project-stack span {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--gray-dim); border: 1px solid var(--line);
          padding: 5px 10px; border-radius: 2px;
        }
        .project-footer {
          display: flex; justify-content: space-between;
          align-items: center; margin-top: 28px;
          padding-top: 22px; border-top: 1px solid var(--line);
          font-family: var(--font-mono); font-size: 11.5px;
          color: var(--gray-dim); letter-spacing: 0.05em;
          gap: 12px; flex-wrap: wrap;
        }
        .project-status {
          display: flex; align-items: center; gap: 8px;
          color: var(--emerald-bright);
        }
        .project-status::before {
          content: ""; width: 6px; height: 6px;
          background: var(--emerald-bright); border-radius: 50%;
          box-shadow: 0 0 8px 2px rgba(63, 224, 166, 0.6);
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .project-row {
            grid-template-columns: 1fr; gap: 20px; padding: 44px 0;
          }
          .project-row:hover { padding-left: 0; padding-right: 0; }
        }

        /* ---- SERVICES ---- */
        .services-section { border-bottom: 1px solid var(--line); }
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--line); border: 1px solid var(--line);
        }
        .service-cell {
          background: var(--bg); padding: 40px 36px;
          min-height: 200px; transition: background 0.4s ease;
        }
        .service-cell:hover { background: #070a08; }
        .service-cell:hover .service-bar { width: 56px; }
        .service-bar {
          width: 26px; height: 2px; background: var(--emerald-bright);
          transition: width 0.4s ease; margin-bottom: 22px;
        }
        .service-label {
          font-family: var(--font-head); font-weight: 600;
          font-size: 19px; letter-spacing: -0.01em;
        }
        .service-detail {
          color: var(--gray); font-size: 14px;
          line-height: 1.65; margin-top: 14px;
        }
        @media (max-width: 960px) { .services-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .services-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) {
          .service-cell { padding: 32px 24px; min-height: auto; }
        }

        /* ---- STATS BAND ---- */
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

        /* ---- CTA ---- */
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
        @media (max-width: 480px) {
          .cta-sub { font-size: 14.5px; margin-top: 20px; }
        }
        .cta-actions {
          display: flex; gap: 14px; justify-content: center;
          margin-top: 44px; flex-wrap: wrap;
          padding: 0 24px;
        }
        @media (max-width: 480px) {
          .cta-actions { margin-top: 32px; gap: 10px; }
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

        /* ---- FOOTER ---- */
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
      <header className={`topnav ${scrolled ? "scrolled" : ""}`}>
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

      {/* MOBILE MENU */}
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
            <span className="bar"></span>DIVISION 03 — SOFTWARE
          </div>
          <h1 className="page-title">
            Our software.
            <br />
            <em>Your</em> advantage.
          </h1>
          <p className="page-lede">
            DURXAN builds ready-to-use business software — inventory,
            bookkeeping, cybersecurity, and support tools — that you can
            explore directly on each product's own site. And when off-the-shelf
            isn't enough, we engineer custom platforms for clients who need
            something built from scratch.
          </p>
          <div className="page-hero-meta">
            <div className="phm-item">
              <div className="phm-val">1</div>
              <div className="phm-label">DURXAN PRODUCTS</div>
            </div>
            <div className="phm-item">
              <div className="phm-val">1</div>
              <div className="phm-label">CLIENT PROJECTS SHIPPED</div>
            </div>
            <div className="phm-item">
              <div className="phm-val">1</div>
              <div className="phm-label">COUNTRIES SERVED</div>
            </div>
            <div className="phm-item">
              <div className="phm-val">99.99%</div>
              <div className="phm-label">UPTIME</div>
            </div>
          </div>
        </div>
      </section>

      {/* DURXAN PRODUCTS */}
      <section className="products-section" id="products">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-label">
                <span className="bar"></span>DURXAN PRODUCTS
              </div>
              <h2 className="section-title">
                Software built by DURXAN, ready for your business.
              </h2>
            </div>
            <p className="section-note">
              Each product has its own dedicated site — explore features,
              documentation, and availability there.
            </p>
          </div>

          <div className="product-grid">
            {products.map((p) => (
              <article key={p.name} className="product-card">
                <div className="product-glow"></div>
                <div className="product-top">
                  <div className="product-index">{p.index}</div>
                  <div className="product-cat">{p.category}</div>
                </div>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-tagline">{p.tagline}</p>
                <p className="product-desc">{p.description}</p>
                <ul className="product-features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="product-bottom">
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-cta"
                  >
                    {p.cta} <span className="arrow">↗</span>
                  </a>
                </div>
                <div className="product-audience">
                  <span>FOR: {p.audience.toUpperCase()}</span>
                  <span className="product-external">{p.externalLabel}</span>
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

      {/* CLIENT PROJECTS */}
      <section className="clients-section" id="clients">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-label">
                <span className="bar"></span>CLIENT WORK
              </div>
              <h2 className="section-title">
                Custom software we built for our clients.
              </h2>
            </div>
            <p className="section-note">
              A selection of production platforms DURXAN engineered for
              organizations across industries and continents.
            </p>
          </div>

          <div className="project-list">
            {clientProjects.map((p) => (
              <article key={p.app} className="project-row">
                <div className="project-index">{p.index}</div>
                <div>
                  <div className="project-client">{p.client}</div>
                  <h3 className="project-app">{p.app}</h3>
                  <div className="project-type">{p.type}</div>
                  <div className="project-region">
                    {p.sector} · {p.region}
                  </div>
                </div>
                <div className="project-right">
                  <p className="project-desc">{p.description}</p>
                  <div className="project-stack">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <span>BUILT IN {p.duration.toUpperCase()}</span>
                    <span className="project-status">{p.status}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="section-label">
                <span className="bar"></span>ENGINEERING SERVICES
              </div>
              <h2 className="section-title">
                Need something custom? We build that too.
              </h2>
            </div>
            <p className="section-note">
              When off-the-shelf won't cut it, our engineering teams design,
              build, and ship software tailored to your operation.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div key={s.label} className="service-cell">
                <div className="service-bar"></div>
                <div className="service-label">{s.label}</div>
                <p className="service-detail">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="wrap">
          <h2 className="cta-title">
            Use our software. Or <em>build</em> something with us.
          </h2>
          <p className="cta-sub">
            Whether you want to explore a DURXAN product or commission a
            custom platform, our team is ready.
          </p>
          <div className="cta-actions">
            <Link href="/#contact" className="btn btn-solid">
              Start a Conversation
            </Link>
            <Link href="#products" className="btn btn-ghost">
              Explore Our Products
            </Link>
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
              <h4>PRODUCTS</h4>
              <a href="#" target="_blank" rel="noopener noreferrer">
                ClaukkInventory ↗
              </a>
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