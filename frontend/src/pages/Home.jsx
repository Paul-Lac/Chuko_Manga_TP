import PrefilterTome from "../components/PrefilterTome";
import PrefilterBatch from "../components/PrefilterBatch";
import CallCatalog from "../components/CallCatalog";
import CallResearch from "../components/CallResearch";
import TeamFavorites from "../components/TeamFavorites";
import HeroBanner from "../components/HeroBanner";

import "./Home.css";

function Home() {
  return (
    <main className="home_main container_limit">
      <HeroBanner />
      <PrefilterTome />
      <CallCatalog />
      <PrefilterBatch />
      <CallResearch />
      <TeamFavorites />
    </main>
  );
}

export default Home;
