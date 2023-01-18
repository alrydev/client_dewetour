import React from 'react'
import { Card, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'

import { API } from '../../config/api'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

export default function TourCardSection({searchs}) {
    const [modalConfirm, setConfirm] = useState(false);
    const closeConfirm = () => setConfirm(false);
    const showConfirm = () => setConfirm(true);


    const [state, dispatch] = useContext(UserContext)

    const navigate = useNavigate()


    const formatRupiah = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })



    // get trips data: 
    let { data: trips } = useQuery('tripsCache', async () => {
        const response = await API.get('/trips')
        return response.data.data
    })
    console.log("ini data trips ", trips);


    return (
        <>

            <section className='tour-card-section'>
                <h2 className='text-center p-5'>GROUP TOUR</h2>
                <div>
                    <div className="row">
                    {trips?.filter((value) => {
                    if (searchs === "") {
                        return value
                    } else if (value.title.toLowerCase().includes(searchs.toLowerCase())) {
                        return value
                    }
                }).map((items) => (

                    <div className="col-sm-4 d-flex justify-content-center mb-5">

                                {state.isLogin === true && state.user.role === "user" ?
                                    <>
                                        <Card className='border-0 pointer' style={{ width: '22rem' }}

                                            onClick={() => { navigate(`/detail/${items.id}`) }}
                                        >
                                            <span className='fw-light text-grey bg-white-trans mt-3 ps-1 pe-3 rounded-end' variant="end" style={{ position: "absolute" }}>
                                                remaining quota: <span className='fw-bold'>{items.quota}</span>
                                            </span>
                                            <Card.Img className='pointer' variant="top" src={items.image} alt='' />

                                            <Card.Body>
                                                <Card.Title>
                                                    {items.title}
                                                </Card.Title>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='fw-bold text-warning' >
                                                        {formatRupiah.format(items.priceTrip)}
                                                    </span>
                                                    <span className='fw-bold text-grey'>
                                                        {items.country.name}
                                                    </span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </>

                                    :
                                    <Card className='border-0 pointer' style={{ width: '22rem' }}

                                        onClick={() => setConfirm(true)}
                                    >
                                        <Card.Img className='pointer' variant="top" src={items.image} alt='' />
                                        <span className='fw-light text-grey bg-white-trans mt-3 ps-1 pe-3 rounded-end' variant="end" style={{ position: "absolute" }}>
                                            remaining quota: <span className='fw-bold'>{items.quota}</span>
                                        </span>
                                        <Card.Body>
                                            <Card.Title>
                                                {items.title}
                                            </Card.Title>
                                            <div className='d-flex justify-content-between'>
                                                <span className='fw-bold text-warning' >
                                                    {formatRupiah.format(items.priceTrip)}
                                                </span>
                                                <span className='fw-bold text-grey'>
                                                    {items.country.name}
                                                </span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                }

                    </div>

                ))}
                        {/* {trips?.map((items) => (
                            <div className="col-sm-4 d-flex justify-content-center mb-5">

                                {state.isLogin === true && state.user.role === "user" ?
                                    <>
                                        <Card className='border-0 pointer' style={{ width: '22rem' }}

                                            onClick={() => { navigate(`/detail/${items.id}`) }}
                                        >
                                            <span className='fw-light text-grey bg-white-trans mt-3 ps-1 pe-3 rounded-end' variant="end" style={{ position: "absolute" }}>
                                                remaining quota: <span className='fw-bold'>{items.quota}</span>
                                            </span>
                                            <Card.Img className='pointer' variant="top" src={items.image} alt='' />

                                            <Card.Body>
                                                <Card.Title>
                                                    {items.title}
                                                </Card.Title>
                                                <div className='d-flex justify-content-between'>
                                                    <span className='fw-bold text-warning' >
                                                        {formatRupiah.format(items.priceTrip)}
                                                    </span>
                                                    <span className='fw-bold text-grey'>
                                                        {items.country.name}
                                                    </span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </>

                                    :
                                    <Card className='border-0 pointer' style={{ width: '22rem' }}

                                        onClick={() => setConfirm(true)}
                                    >
                                        <Card.Img className='pointer' variant="top" src={items.image} alt='' />
                                        <span className='fw-light text-grey bg-white-trans mt-3 ps-1 pe-3 rounded-end' variant="end" style={{ position: "absolute" }}>
                                            remaining quota: <span className='fw-bold'>{items.quota}</span>
                                        </span>
                                        <Card.Body>
                                            <Card.Title>
                                                {items.title}
                                            </Card.Title>
                                            <div className='d-flex justify-content-between'>
                                                <span className='fw-bold text-warning' >
                                                    {formatRupiah.format(items.priceTrip)}
                                                </span>
                                                <span className='fw-bold text-grey'>
                                                    {items.country.name}
                                                </span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                }

                            </div>
                        ))} */}
                    </div>
                </div>
            </section>

            <Modal show={modalConfirm} centered onHide={closeConfirm}>

                {
                    state.isLogin === true && state.user.role === "admin" ?
                        <Modal.Body className='' >
                            <p className='d-flex justify-content-center'>you're an admin</p>
                            <p className='d-flex justify-content-center'>register with another account to book the trip</p>
                        </Modal.Body>
                        :
                        <Modal.Body className='' >
                            <p className='d-flex justify-content-center'>login or register first to start your journey</p>
                        </Modal.Body>
                }

            </Modal>

        </>
    )
}
