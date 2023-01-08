import React from 'react'

import CardBooking from '../components/CardBooking'
import Footer from '../components/HomePage/Footer'
import NavUser from '../components/navbar/NavUser'

export default function BookingPage() {
    return (
        <>
            <NavUser />
            <CardBooking />
            <Footer />
        </>
    )
}
