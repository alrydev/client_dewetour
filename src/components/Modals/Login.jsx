import React, { useState } from 'react'
import { useContext } from 'react';


import { Modal, Form, Button } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function Login({ modalLogin, setModalLogin, switchRegister }) {

    const [, dispatch] = useContext(UserContext)

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
        // role: "user"
    })

    const handleChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await API.post('/login', formLogin, config)


            setTimeout(function () {
                window.location.reload();
            }, 2000); // 3000 ms = 3 detik

            if (response?.status === 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })

                setModalLogin(false)
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'LOGIN SUCCESS',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                });
            }


        } catch (error) {
            console.log(error);
        }
    })


    return (
        <>
            <Modal
                size="sm"
                centered
                show={modalLogin}
                onHide={() => setModalLogin(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header className='d-flex justify-content-center'>
                    <h4 className='fw-bold' >Login</h4>
                </Modal.Header>
                <Form className='p-2' onSubmit={(e) => handleSubmit.mutate(e)}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="fw-bold" >Email</Form.Label>
                        <Form.Control id='email' className="bg-lightgrey border-0" name='email' onChange={handleChange} type="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="fw-bold">Password</Form.Label>
                        <Form.Control id='password' className="bg-lightgrey border-0" name='password' onChange={handleChange} type="password" />
                    </Form.Group>

                    <Button className='w-100 bg-warning text-white fw-bolder mt-3' variant="warning" type="submit">
                        Login
                    </Button>
                    <Form.Label className='d-flex justify-content-center pt-3 pb-2'>
                        <span>don't have an account? click <span onClick={() => { setModalLogin(false); switchRegister(true) }} className='fw-bolder pointer'>here</span></span>
                    </Form.Label>
                </Form>
            </Modal>
        </>
    )
}
