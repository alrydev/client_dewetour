import React, { useState } from 'react'

import { Button, Form, Card, Stack } from 'react-bootstrap';

import { Fade, Slide } from "react-awesome-reveal";

import HeaderCard from '../../DataDummy/HeaderCard';




export default function Jumbotron({ setSearch }) {
    let [search, searchCountry] = useState()
    let dataTrip = JSON.parse(localStorage.getItem("DATA_TRIP"))

    const handleChange = (e) => {
        searchCountry({
            [e.target.name]: e.target.value
        })
    }



    return (
        <>



            <section className='header-section pt-5 mt-0'>
                <div className='d-flex justify-content-center'>
                    <div className='header-greet text-white d-flex justify-content-center flex-column pt-5 mt-5'>
                        <Fade>
                            <p className='text-header-greet '>Explore</p>
                        </Fade>
                        <Slide>
                            <p className='text-header-greet2 fw-light '>your amazing city together</p>
                        </Slide>
                    </div>
                </div>

                <div className='text-center fw-light' >
                    <p className='text-white' >Find great places to holiday</p>
                    <Form className='d-flex justify-content-center' >
                        <Form.Control onChange={e => { setSearch(e.target.value) }} className='w-50 rounded-5 border-0' type="text" placeholder='search trips' name='country' />
                    </Form>
                </div>

            </section >

            <section className='header-section-bottom d-flex justify-content-center' >
                <Stack direction="horizontal" gap={4}>
                    {HeaderCard.map((items) => (

                        <div>
                            <Card className='border-white p-2' style={{ width: '12rem' }}>
                                <div className='d-flex justify-content-center'>
                                    <img className='card-header-img w-50' src={items.image} alt=''></img>
                                </div>
                                <Card.Body className='text-center'>
                                    <Card.Title>{items.title}</Card.Title>
                                    <Card.Text>
                                        {items.desc}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                    ))}
                </Stack>
            </section>


        </>
    )
}
