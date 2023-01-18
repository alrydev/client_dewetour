import React, { useState } from 'react'
import { Card, Stack, Button, Modal, Form } from 'react-bootstrap'

import { CgProfile } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import { API } from '../config/api';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function CardProfile() {

    const [state,] = useContext(UserContext)

    const {data: user, refetch: userRefetch} = useQuery('userCache', async () =>{
        const response = await API.get(`/user/${state?.user.id}`)
        return response.data.data
    })

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: 0,
        address: "",
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
                    Authorization: "Basic " + localStorage.token,
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData()
            formData.set('name', form.name)
            formData.set('email', form.email)
            formData.set('password', form.password)
            formData.set('phone', form.phone)
            formData.set('address', form.address)
            formData.set('role', form.role)
            formData.set('image', form.image[0])

            const response = await API.patch('/user', formData, form, config)
            if(response.status == 200) {
                userRefetch()
            }
            // window.location.reload()
            console.log(response);

        } catch (error) {
            console.log(error);
        }

    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("data user", user )

    return (
        <>
            <div className='pt-3 pb-2 d-flex justify-content-center mt-5'>
                <Card body className='w-50 mt-5'>
                    <div className='d-flex justify-content-between'>
                        <section>
                            <h2 className='mb-3 fw-bold'>Personal Info</h2>
                            <Stack gap={4}>
                                <div>
                                    <Stack direction="horizontal" gap={2}>
                                        <div className="fs-5">
                                            <CgProfile />
                                        </div>
                                        <div className="">
                                            <div>
                                                {user?.Name}
                                            </div>
                                            <span className='fw-light text-grey' >fullname</span>
                                        </div>
                                    </Stack>
                                </div>
                                <div className="">
                                    <Stack direction="horizontal" gap={2}>
                                        <div className="fs-5">
                                            <MdLocationOn />
                                        </div>
                                        <div className="">
                                            <div>
                                                {user?.address}
                                            </div>
                                            <span className='fw-light text-grey' >address</span>
                                        </div>
                                    </Stack>
                                </div>
                                <div className="">
                                    <Stack direction="horizontal" gap={2}>
                                        <div className="fs-5">
                                            <MdEmail />
                                        </div>
                                        <div className="">
                                            <div>
                                                {user?.email}
                                            </div>
                                            <span className='fw-light text-grey' >email</span>
                                        </div>
                                    </Stack>
                                </div>
                                <div>
                                    <Stack direction="horizontal" gap={2}>
                                        <div className="fs-5">
                                            <FaPhoneAlt />
                                        </div>
                                        <div className="">
                                            <div>
                                                {user?.phone}
                                            </div>
                                            <span className='fw-light text-grey' >phone</span>
                                        </div>
                                    </Stack>
                                </div>
                            </Stack>
                        </section>

                        <section className='pe-5 me-2'>
                            <Card className=' border-0' style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={state.user.image} alt='' />
                                <Card.Body className='d-flex justify-content-center' >
                                    <Button onClick={handleShow} className='text-white fw-bold ps-4 pe-4' variant="warning">Change Profile</Button>
                                </Card.Body>
                            </Card>
                        </section>
                    </div>

                </Card>

            </div>

            <Modal size="md" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)} >

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control onChange={handleOnChange} name="name" type="text" defaultValue={user?.Name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={handleOnChange} name="address" type="text" defaultValue={user?.address} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onChange={handleOnChange} name="phone" type="number" defaultValue={user?.phone} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleOnChange} name="email" type="email" defaultValue={user?.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={handleOnChange} name="password" type="password" defaultValue="***" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Image</Form.Label>
                            <Form.Control required onChange={handleOnChange} name="image" type="file" />
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button type='submit' className="w-75 mx-2 text-center fw-bold text-white " variant="warning" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>


            </Modal>
        </>
    )
}
