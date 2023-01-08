import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { Modal, Form, Button, } from 'react-bootstrap';
import { API } from '../../config/api'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function Register({ modalRegister, setModalRegister, switchLogin }) {

    // const [message, setMessage] = useState(null)

    // const alert = (
    //     <Alert variant='success' className='py-1'>
    //         Success
    //     </Alert>
    // )

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        gender: "",
        image: "",
        role: "user",

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
            formData.set('name', form.name)
            formData.set('email', form.email)
            formData.set('password', form.password)
            formData.set('phone', form.phone)
            formData.set('address', form.address)
            formData.set('gender', form.gender)
            formData.set('role', form.role)
            formData.set('image', form.image[0])

            console.log(form);
            const response = await API.post('/register', formData, form, config)
            // setMessage(alert)

            if (response?.status === 200) {

                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'REGISTER SUCCESS',
                    showConfirmButton: false,
                    timer: 2000
                })
                setModalRegister(false)
                switchLogin(true)
            }


        } catch (error) {
            console.log(error);
        }
    })

    return (
        <>
            <Modal

                size='md p-4'
                // style={{ width: '50rem', alignContent: 'center' }}
                centered
                show={modalRegister}
                onHide={() => setModalRegister(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header className='d-flex justify-content-center'>
                    <h4 className='fw-bold' >Register</h4>
                </Modal.Header>

                <Form className='m-3' onSubmit={(e) => handleSubmit.mutate(e)}  >
                    {/* {message} */}
                    <div className='overflow-auto px-2' style={{ height: '45vh' }}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label className="fw-bold">Full Name</Form.Label>
                            <Form.Control className="bg-lightgrey border-0 " name='name' onChange={handleOnChange} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control className="bg-lightgrey border-0" name='email' onChange={handleOnChange} type="email" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="formBasicPassword">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <Form.Control className="bg-lightgrey border-0" name='password' onChange={handleOnChange} type="password" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="">
                            <Form.Label className="fw-bold">Phone</Form.Label>
                            <Form.Control className="bg-lightgrey border-0" name='phone' onChange={handleOnChange} type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="">
                            <Form.Label className="fw-bold">Address</Form.Label>
                            <Form.Control className="bg-lightgrey border-0" name='address' onChange={handleOnChange} type="text-area" />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="">
                            <Form.Label className="fw-bold">Gender</Form.Label>
                            <Form.Control className="bg-lightgrey border-0" name='gender' onChange={handleOnChange} type="text" placeholder='Male/Female' />
                        </Form.Group>

                        <Form.Group className="mb-3 " controlId="">
                            <Form.Label for className="fw-bold">Image</Form.Label>
                            <Form.Control className="bg-lightgrey border-0" name='image' onChange={handleOnChange} type="file" />
                        </Form.Group>

                    </div>

                    <Button className='w-100 bg-warning text-white fw-bolder mt-3' variant="warning" type="submit">
                        Register
                    </Button>
                    <Form.Label className='d-flex justify-content-center pt-3 pb-2'>
                        <span>already have an account? click <span className='fw-bolder pointer' onClick={() => { setModalRegister(false); switchLogin(true) }} >here</span></span>
                    </Form.Label>
                </Form>
            </Modal>
        </>
    )
}