import React, { useState } from 'react'

import NavUser from '../components/navbar/NavUser'
import Jumbotron from '../components/HomePage/Jumbotron'
import TourCardSelection from '../components/HomePage/TourCardSection'
import Footer from '../components/HomePage/Footer'

export default function HomeUser() {

    const [searchs, setSearch] = useState("")

    return (
        <>
            <NavUser />
            <Jumbotron setSearch={ setSearch } searchs={searchs} />
            <TourCardSelection searchs={searchs} />
            <Footer />
        </>
    )
}
