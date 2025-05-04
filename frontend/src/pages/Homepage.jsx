
// import Navbar from "./components/Navbar"
// import Hero from "./components/Hero"
// import Features from "./components/Features"
// import CTA from "./components/CTA"
// import Footer from "./components/Footer"
import MainNav from "../components/MainNav/MainNav";
import CTA from "../components/CTA/CTA";

import HomeCard from "../components/HomeCard/HomeCard";

import Hero from "../components/Hero/Hero";

import Footer from "../components/Footer/Footer";
import About from "../components/About/About";

function Homepage() {
  return (
    <div className="min-h-screen bg-black text-purple-100 font-sans">
      {/* <MainNav /> */}
      <main className="container mx-auto px-4 py-12">
        <Hero />
        <HomeCard/>

        <About></About>

        <CTA />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Homepage;

