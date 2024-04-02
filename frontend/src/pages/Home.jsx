import "./Home.css";
import PrefilterAdvertByDesc from "../components/PrefilterAdvertByDesc";
import PrefilterAdvertByBatch from "../components/PrefilterAdvertByBatch";
import RepalledeSale from "../components/RepalledeSale/RepalledeSale";
import RappelRecherche from "../components/RappelRecherche";
import CoupDeCoeur from "../components/CoupDeCoeur";
import HeroBanner from "../components/HeroBanner";

function Home() {
  return (
    <main className="home_main container_limit">
      <HeroBanner />
      <PrefilterAdvertByDesc />
      <RepalledeSale />
      <PrefilterAdvertByBatch />
      <RappelRecherche />
      <CoupDeCoeur />
    </main>
  );
}

export default Home;
