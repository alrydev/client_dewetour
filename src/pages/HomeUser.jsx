import React from 'react'

import NavUser from '../components/navbar/NavUser'
import Jumbotron from '../components/HomePage/Jumbotron'
import TourCardSelection from '../components/HomePage/TourCardSection'
import Footer from '../components/HomePage/Footer'

export default function HomeUser() {
    return (
        <>
            <NavUser />
            <Jumbotron />
            <TourCardSelection />
            <Footer />
        </>
    )
}
