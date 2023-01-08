import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import IconLogo from '../../assets/images/Iconlogo.png'

import profileIcon from '../../assets/images/profileIcon.png'
import logoutIcon from '../../assets/images/logoutIcon.png'
import payIcon from '../../assets/images/payIcon.png'
import tripIcon from '../../assets/images/tripIcon.png'
import { Container, Navbar, Button, Overlay, Popover, Stack } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import Swal from 'sweetalert2'
import Login from '../Modals/Login';
import Register from '../Modals/Register';




export default function NavUser() {

    const navigate = useNavigate()

    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)

    const [showDropdown, setShowDropdown] = useState(false);
    const [target, setTarget] = useState(null);


    const handleClick = (event) => {
        setShowDropdown(!showDropdown);
        setTarget(event.target);
    };

    const [state, dispatch] = useContext(UserContext)


    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "LOGOUT",
                })
                Swal.fire(
                    'Logged Out Success',
                )
            }
        })
    }


    return (
        <>
            <Navbar className='navbarr fixed-top mb-5' style={{ height: "10vh" }} >
                <Container>
                    <Navbar.Brand href="#home">
                        <img onClick={() => navigate("/")} src={IconLogo} alt='' ></img>
                    </Navbar.Brand>
                    <div className='d-flex' >
                        {state.isLogin === true ? (
                            <>
                                <img style={{
                                    width: "55px",
                                    height: "55px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    borderWidth: "2px",
                                }} onClick={handleClick} className='pointer' src={state.user.image} alt=''></img>
                                <Overlay
                                    show={showDropdown}
                                    target={target}
                                    placement="bottom"
                                    containerPadding={20}
                                >
                                    <Popover id="popover-contained">
                                        <Popover.Body className=' width-pop'>
                                            {state.user.role === "admin" ? (
                                                <Stack gap={2}>
                                                    <div onClick={() => navigate("/income-trip")} className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                        <img src={tripIcon} alt=''></img>
                                                        <span className='ps-3 w-50 text-center'>
                                                            trip
                                                        </span>
                                                    </div>
                                                    <div onClick={() => navigate("/transaction")} className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                        <img src={tripIcon} alt=''></img>
                                                        <span className='ps-3 w-100 text-center'>
                                                            transaction
                                                        </span>
                                                    </div>
                                                    <div onClick={logout} className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                        <img src={logoutIcon} alt=''></img>
                                                        logout
                                                    </div>
                                                </Stack>
                                            ) : (
                                                <Stack gap={3}>
                                                    <div onClick={() => navigate("/profile")} className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                        <img src={profileIcon} alt=''></img>
                                                        profile
                                                    </div>
                                                    <div onClick={() => navigate("/pay")} className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                        <img src={payIcon} alt=''></img>
                                                        <span className='ps-3 w-50 text-center'>
                                                            pay
                                                        </span>
                                                    </div>
                                                    <div onClick={logout} className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                        <img src={logoutIcon} alt=''></img>
                                                        logout
                                                    </div>
                                                </Stack>
                                            )}



                                        </Popover.Body>
                                    </Popover>

                                </Overlay>
                            </>

                        ) : (

                            <div className=''>
                                <Button onClick={() => setModalLogin(true)} className='fw-bold width-button-auth me-3' variant="outline-light">Login</Button>

                                <Button onClick={() => setModalRegister(true)} className='width-button-auth text-light fw-bold' variant="warning">Register</Button>
                            </div>
                        )}
                    </div>


                </Container>
            </Navbar>



            <Login modalLogin={modalLogin} setModalLogin={setModalLogin} switchRegister={setModalRegister} />
            <Register modalRegister={modalRegister} setModalRegister={setModalRegister} switchLogin={setModalLogin} />
        </>
    )
}
