import React from 'react'

import CardProfile from '../components/CardProfile'
import NavUser from '../components/navbar/NavUser'
import Footer from '../components/HomePage/Footer'
import CardHistoryTrip from '../components/CardHistoryTrip'


export default function ProfilePage() {
    return (
        <>
            <NavUser />
            <CardProfile />
            <CardHistoryTrip />
            <Footer />
        </>
    )
}
