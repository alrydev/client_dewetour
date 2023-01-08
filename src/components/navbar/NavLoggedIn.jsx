import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import IconLogo from '../../assets/images/Iconlogo.png'
import userNavIcon from '../../assets/images/userNavIcon.png'

import profileIcon from '../../assets/images/profileIcon.png'
import logoutIcon from '../../assets/images/logoutIcon.png'
import payIcon from '../../assets/images/payIcon.png'

import { Container, Navbar, Overlay, Popover, Stack } from 'react-bootstrap';

// import Login from '../Modals/Login';
// import Register from '../Modals/Register';

export default function NavLoggedIn() {

    const navigate = useNavigate()

    // const [modalLogin, setModalLogin] = useState(false)
    // const [modalRegister, setModalRegister] = useState(false)

    // =================
    const [showDropdown, setShowDropdown] = useState(false);
    const [target, setTarget] = useState(null);
    // const ref = useRef(null);

    const handleClick = (event) => {
        setShowDropdown(!showDropdown);
        setTarget(event.target);
    };

    return (
        <>
            <Navbar className='fixed-top' >
                <Container>
                    <Navbar.Brand href="#home">
                        <img onClick={() => navigate("/")} src={IconLogo} alt='' ></img>
                    </Navbar.Brand>

                    <div>
                        {/* <Button onClick={() => setModalLogin(true)} className='width-button-auth me-3' variant="outline-light">Login</Button>

                        <Button onClick={() => setModalRegister(true)} className='width-button-auth text-light fw-bold' variant="warning">Register</Button> */}

                        <div >
                            <img onClick={handleClick} className='pointer' src={userNavIcon} alt=''></img>


                            <Overlay
                                show={showDropdown}
                                target={target}
                                placement="bottom"
                                containerPadding={20}
                            >
                                <Popover id="popover-contained">
                                    <Popover.Body className=' width-pop'>
                                        <Stack gap={3}>
                                            <div className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                <img src={profileIcon} alt=''></img>
                                                profile
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                <img src={payIcon} alt=''></img>
                                                <span className='ps-3 w-50 text-center'>
                                                    pay
                                                </span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center fw-bold pointer">
                                                <img src={logoutIcon} alt=''></img>
                                                logout
                                            </div>
                                        </Stack>
                                    </Popover.Body>
                                </Popover>
                            </Overlay>
                        </div>

                    </div>
                </Container>
            </Navbar>



            {/* <Login modalLogin={modalLogin} setModalLogin={setModalLogin} switchRegister={setModalRegister} />
            <Register modalRegister={modalRegister} setModalRegister={setModalRegister} switchLogin={setModalLogin} /> */}
        </>
    )
}
