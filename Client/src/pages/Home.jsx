import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TestimonialsSlider from '../components/Testinomials'
import SecureFlowFeatures from '../components/Features'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <SecureFlowFeatures/>
        <TestimonialsSlider/>
        <Footer/>
    </div>
  )
}

export default Home