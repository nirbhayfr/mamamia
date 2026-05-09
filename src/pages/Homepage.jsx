import HeroSection from "../components/homepage/Hero";
import LiquidCollection from "../components/homepage/LiquidCollection";
import OurCraft from "../components/homepage/OurCraft";
import Reviews from "../components/homepage/Reviews";
import RitualSet from "../components/homepage/RitualSet";
import SkinFinder from "../components/homepage/SkinFinder";
import SoapCollection from "../components/homepage/SoapCollection";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

function Homepage() {
	return (
		<main>
			<Navbar />
			<HeroSection />
			<SoapCollection />
			<SkinFinder />
			<OurCraft />
			<Reviews />
			<LiquidCollection />
			<RitualSet />
			<Footer />
		</main>
	);
}

export default Homepage;
