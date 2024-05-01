import React from 'react'
import Header from './Header'
import './landing.css'
import Infobox from './Infobox'
import About from './About'
import Services from './Services'
import { Experience } from './Experience'


const Home = () => {
  return (
    <>
        <Header/>
        <Infobox/>
        <About/>
        <Services/>
        <Experience/>
    </>
  )
}

export default Home