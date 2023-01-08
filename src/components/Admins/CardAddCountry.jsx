import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { API } from '../../config/api'
import { useMutation, } from 'react-query'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
const Swal2 = withReactContent(Swal)


export default function CardAddCountry() {

    const navigate = useNavigate()

    const [formCountry, setFormCountry] = useState({ name: "" })

    const handleChange = (e) => {
        setFormCountry({
            ...formCountry,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const response = await API.post('/country', formCountry)

            if (response?.status === 200) {
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Country Added',
                    showConfirmButton: false,
                    timer: 2000
                })
                navigate("/income-trip")

            }

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    })


    return (
        <>
            <section className='my-5 d-flex justify-content-center'>
                <Form onSubmit={(e) => handleSubmit.mutate(e)} className='w-25'>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='fw-bold d-flex justify-content-center fs-4 mt-5' >Add Country</Form.Label>
                        <Form.Control name='name' onChange={handleChange} type="text" placeholder="" />
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                        <Button className='text-white fw-bold px-5' variant="warning" type="submit">
                            Submit
                        </Button>

                    </div>
                </Form>

            </section>
        </>
    )
}
