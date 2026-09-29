import SoftwareClient from "../../components/SoftwareClient";
import PageGate from "../../components/PageGate";

export const metadata = {
  title: "Software — DURXAN | Products & Client Engineering",
  description:
    "DURXAN builds its own software products — Accounting, Artificial Intelligence, cybersecurity, and business tools — and engineers custom software for clients. Explore our platforms or see client work.",
  keywords: [
    "accounting software",
    "artificial intelligence software",
    "cybersecurity software",
    "business software",
    "custom software development",
    "enterprise software",
    "DURXAN software",
  ],
  openGraph: {
    title: "Software — DURXAN | Products & Client Engineering",
    description:
      "Business software products by DURXAN, plus custom software engineered for clients.",
    type: "website",
    siteName: "DURXAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software — DURXAN",
    description:
      "Business software products by DURXAN, plus custom software engineered for clients.",
  },
  alternates: {
    canonical: "https://durxan.com/software",
  },
};

export default function SoftwarePage() {
  return (
   
      <SoftwareClient />
  
  );
}