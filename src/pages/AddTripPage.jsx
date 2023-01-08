import React from 'react'
import NavUser from '../components/navbar/NavUser'
import CardAddTrip from '../components/Admins/CardAddTrip'
import Footer from '../components/HomePage/Footer'
import { useState } from 'react'

export default function AddTripPage() {

    const [state,] = useState()

    console.log("ini state add trip", state);

    return (
        <>
            <NavUser />
            <CardAddTrip />
            <Footer />
        </>
    )
}
