import AutonomousClient from "../../components/AutonomousClient";

export const metadata = {
  title: "Autonomous Systems — DURXAN | Aerial & Ground Autonomy",
  description:
    "DURXAN Autonomous Systems builds intelligent aerial and ground platforms — drones, delivery fleets, defense and security systems — engineered to operate with increasing levels of autonomy under human supervision.",
  keywords: [
    "autonomous drones",
    "autonomous delivery",
    "defense drones",
    "security drones",
    "UAV systems",
    "ground autonomous platforms",
    "unmanned systems",
    "DURXAN autonomous",
  ],
  openGraph: {
    title: "Autonomous Systems — DURXAN | Aerial & Ground Autonomy",
    description:
      "Intelligent aerial and ground platforms engineered to operate with increasing autonomy under human supervision.",
    type: "website",
    siteName: "DURXAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous Systems — DURXAN",
    description:
      "Intelligent aerial and ground platforms engineered to operate with increasing autonomy under human supervision.",
  },
  alternates: {
    canonical: "https://durxan.com/autonomous",
  },
};

export default function AutonomousPage() {
  return <AutonomousClient />;
}