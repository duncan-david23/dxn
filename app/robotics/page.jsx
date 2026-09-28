import RoboticsClient from "../../components/RoboticsClient";

export const metadata = {
  title: "Robotics — DURXAN | Machines That Perceive, Decide, and Act",
  description:
    "DURXAN Robotics builds humanoid, household, delivery, and specialized robots engineered for the real world — machines that perceive, move, interact, and assist in human environments.",
  keywords: [
    "humanoid robots",
    "service robots",
    "delivery robots",
    "household robots",
    "industrial robots",
    "robotics company",
    "DURXAN robotics",
  ],
  openGraph: {
    title: "Robotics — DURXAN | Machines That Perceive, Decide, and Act",
    description:
      "Humanoid, household, delivery, and specialized robots engineered for the real world.",
    type: "website",
    siteName: "DURXAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics — DURXAN",
    description:
      "Humanoid, household, delivery, and specialized robots engineered for the real world.",
  },
  alternates: {
    canonical: "https://durxan.com/robotics",
  },
};

export default function RoboticsPage() {
  return <RoboticsClient />;
}