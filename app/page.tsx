import Image from "next/image";
import LandingPageUi from "../components/LandingPageUi";

import PageGate from "../components/PageGate";

export default function Home() {
  return (
    <>
    
      <PageGate>
        <LandingPageUi />
      </PageGate>
    </>
  );
}

