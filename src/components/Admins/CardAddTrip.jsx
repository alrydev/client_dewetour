import React, { useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { API } from '../../config/api';


import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
const Swal2 = withReactContent(Swal)

export default function CardAddTrip() {

    const navigate = useNavigate()


    let { data: countries } = useQuery('countriesCachce', async () => {
        const response = await API.get('/countries')
        return response.data.data
    })


    const [form, setForm] = useState({
        title: "",
        country_id: 0,
        accomodation: "",
        transportation: "",
        meal: "",
        day: 0,
        night: 0,
        date: "",
        price: 0,
        quota: 0,
        desc: "",
        image: "",
    })



    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
    }
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            let formData = new FormData()
            formData.set('title', form.title)
            formData.set('country_id', form.country_id)
            formData.set('accomodation', form.accomodation)
            formData.set('transportation', form.transportation)
            formData.set('meal', form.meal)
            formData.set('day', form.day)
            formData.set('night', form.night)
            formData.set('date', form.date)
            formData.set('price', form.price)
            formData.set('quota', form.quota)
            formData.set('desc', form.desc)
            formData.set('image', form.image[0])

            const response = await API.post('/trip', formData, form, config)
            if (response?.status === 200) {
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Trip Added',
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
            <div className='d-flex justify-content-center mb-4 mt-5 pt-5'>
                <h3 className="fw-bold w-50 mt-5 pt-5">Add Trip</h3>
            </div>
            <div className='d-flex justify-content-center mb-5'>

                <Form className='w-50 mb-5' onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='fw-bold'>Title Trip</Form.Label>
                        <Form.Control name="title" onChange={handleOnChange} className='bg-lightgrey border-0 w-100' type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='w-100 fw-bold' >Country</Form.Label>
                        <Form.Select onChange={handleOnChange} name="country_id" aria-label="Default select example">
                            <option  >  Select Country</option>
                            {countries?.map((items) => (
                                <option value={items.id}>{items.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Accomodation</Form.Label>
                        <Form.Control name='accomodation' onChange={handleOnChange} className='bg-lightgrey border-0' type="text" />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Transportation</Form.Label>
                        <Form.Control name='transportation' onChange={handleOnChange} className='bg-lightgrey border-0' type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Eat</Form.Label>
                        <Form.Control name='meal' onChange={handleOnChange} className='bg-lightgrey border-0' type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Duration</Form.Label>
                        <section className='d-flex '>
                            <div className=' d-flex w-25 me-5 align-items-center' >
                                <Form.Control name='day' onChange={handleOnChange} className='w-75 bg-lightgrey border-0' type="number" />
                                <Form.Label className='ms-2 fw-bold' >Day</Form.Label>
                            </div>
                            <div className=' d-flex w-25 me-5 align-items-center'>
                                <Form.Control name='night' onChange={handleOnChange} className='w-75 bg-lightgrey border-0' type="number" />
                                <Form.Label className='ms-2 fw-bold'>Night</Form.Label>
                            </div>
                        </section>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Date Trip</Form.Label>
                        <Form.Control name='date' onChange={handleOnChange} className='bg-lightgrey border-0' type="date" />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Price</Form.Label>
                        <Form.Control name='price' onChange={handleOnChange} className='bg-lightgrey border-0' type="number" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Quota</Form.Label>
                        <Form.Control name='quota' onChange={handleOnChange} className='bg-lightgrey border-0' type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold'>Description</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2" >
                            <Form.Control
                                name='desc'
                                onChange={handleOnChange}
                                className='bg-lightgrey border-0'
                                as="textarea"
                                style={{ height: '120px' }}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='w-100 fw-bold' >Image</Form.Label>
                        <Form.Control className='bg-lightgrey border-0' type="file" name="image" onChange={handleOnChange} />
                    </Form.Group>

                    <div className='d-flex justify-content-center'>
                        {
                            handleSubmit.isLoading ? (
                                <Button className='ps-5 pe-5 fw-bold text-light text-center' variant='warning' type="submit">
                                    Loading
                                </Button>
                            ) : (
                                <Button className='ps-5 pe-5 fw-bold text-light text-center' variant='warning' type="submit">
                                    Add Trip
                                </Button>
                            )
                        }


                    </div>
                </Form>

            </div>
        </>
    )
}
