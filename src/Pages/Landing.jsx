import React from 'react'
import HeroSection from '../Components/HeroSection';
import HowItWorks from '../Components/HowItWorks';
import PopularSkills from '../Components/PopularSkills';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';
import Header from '../Components/Header/Header';
import CallToAction from '../Components/CallToAction';
function Landing() {
  return (
<>
<Header />
            <HeroSection />
            <HowItWorks />
            <PopularSkills />
            <Testimonials />
            <CallToAction />
            <Footer />
</>
  )
}

export default Landing