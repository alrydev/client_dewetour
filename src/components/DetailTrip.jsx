import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Button, Modal, Carousel } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { API } from '../config/api'
import { useQuery, useMutation } from 'react-query'

import { useContext } from 'react'
import { UserContext } from '../context/userContext'


import detailTrip1 from '../assets/images/detailTrip/detailTrip1.png'
import detailTrip2 from '../assets/images/detailTrip/detailTrip2.png'
import detailTrip3 from '../assets/images/detailTrip/detailTrip3.png'

import hotelIcon from '../assets/images/detailTrip/hotelIcon.png'
import mealIcon from '../assets/images/detailTrip/mealIcon.png'
import planeIcon from '../assets/images/detailTrip/planeIcon.png'
import timeIcon from '../assets/images/detailTrip/timeIcon.png'
import dateIcon from '../assets/images/detailTrip/dateIcon.png'


export default function DetailTrip() {

    const navigate = useNavigate()

    const [state,] = useContext(UserContext)
    if (state.user.role === "admin") {
        navigate("/")
    }

    if (state.isLogin === false) {
        navigate("/")
    }


    let { id } = useParams()

    let { data: trip } = useQuery('tripCache', async () => {
        const response = await API.get('/trip/' + id)
        return response.data.data
    })

    console.log("ini data trip by id : ", trip);

    const formatRupiah = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })


    // ==================================

    let person = 1

    let [addPerson, setAddPerson] = useState(1)
    const [showWarning, setShowWarning] = useState(false)

    function AddCounter() {
        setAddPerson(addPerson + person)
        if (addPerson === trip?.quota) {
            setAddPerson(trip?.quota)
            setShowWarning(true)
        }
    }
    function handleCloseWarning() {
        setShowWarning(false)
    }
    function LessCounter() {
        if (addPerson !== 1) {
            setAddPerson(addPerson - person)

        }
    }




    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-J0woOYlPIw8UXLJ4";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);




    const handleBuy = useMutation(async (data) => {


        try {
            const config = {
                method: "POST",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "multipart/form-data",
                },
            };

            let form = new FormData()

            form.append("counter_qty", data.counter_qty)
            form.append("total", data.total)
            form.append("user_id", data.user_id)
            form.append("trip_id", data.trip_id)

            const response = await API.post("/transaction", form, config);
            console.log(response);
            const token = response.data.data.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    navigate("/pay");
                },
                onPending: function (result) {
                    console.log(result);
                    navigate("/pay");
                },
                onError: function (result) {
                    console.log(result);
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <>
            <section className=''>
                <div className='d-flex justify-content-center mt-5' >
                    <div className='mt-2 w-75'>
                        <h3 className='pt-5'>
                            {trip?.title}
                        </h3>
                        <p>
                            {trip?.country.name}
                        </p>
                    </div>
                </div>

                <Stack gap={2}>
                    <div className=" text-center">
                        {/* <img className='rounded' style={{ width: "153vh", height: "50vh", objectFit: "cover" }}
                            src={trip?.image}
                            alt=''>
                        </img> */}
                        <div className='d-flex justify-content-center'>

                            <Carousel fade className=' w-75'>
                                <Carousel.Item>
                                    <img className='rounded' style={{ width: "153vh", height: "70vh", objectFit: "cover" }}
                                        src={trip?.image}
                                        alt=''>
                                    </img>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img className='rounded' style={{ width: "153vh", height: "70vh", objectFit: "cover" }}
                                        src={detailTrip1}
                                        alt=''>
                                    </img>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img className='rounded' style={{ width: "153vh", height: "70vh", objectFit: "cover" }}
                                        src={detailTrip2}
                                        alt=''>
                                    </img>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img className='rounded' style={{ width: "153vh", height: "70vh", objectFit: "cover" }}
                                        src={detailTrip3}
                                        alt=''>
                                    </img>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                    {/* <div className=" d-flex justify-content-center">
                        <Stack direction="horizontal" gap={3}>
                            <div className="">
                                <img src={detailTrip1} alt=''></img>
                            </div>
                            <div className="">
                                <img src={detailTrip2} alt=''></img>
                            </div>
                            <div className="">
                                <img src={detailTrip3} alt=''></img>
                            </div>
                        </Stack>
                    </div> */}
                </Stack>




            </section>

            <section >

                <div className='d-flex justify-content-center'>
                    <p className=' fs-5 fw-bold w-75 pt-2 '>
                        Information Trip
                    </p>
                </div>

                <div className="d-flex justify-content-center">
                    <Stack className=" w-75 d-flex justify-content-between" direction="horizontal" gap={5}>
                        <div className="">
                            <p className='text-grey2 fw-bold'>Accomodation</p>
                            <img src={hotelIcon} alt=''></img>
                            <span className='ps-2 fw-bold'>
                                {trip?.accomodation} {trip?.night} Nights
                            </span>
                        </div>
                        <div className="">
                            <p className='text-grey2 fw-bold'>Transportation</p>
                            <img src={planeIcon} alt=''></img>
                            <span className='ps-2 fw-bold'>
                                {trip?.transportation}
                            </span>
                        </div>
                        <div className="">
                            <p className='text-grey2 fw-bold'>Eat</p>
                            <img src={mealIcon} alt=''></img>
                            <span className='ps-2 fw-bold'>
                                {trip?.meal}
                            </span>
                        </div>
                        <div className="">
                            <p className='text-grey2 fw-bold'>Duration</p>
                            <img src={timeIcon} alt=''></img>
                            <span className='ps-2 fw-bold'>
                                {trip?.day} Day {trip?.night} Night
                            </span>
                        </div>
                        <div className="">
                            <p className='text-grey2 fw-bold'>Date Trip</p>
                            <img src={dateIcon} alt=''></img>
                            <span className='ps-2 fw-bold'>
                                {trip?.dateTrip}
                            </span>
                        </div>
                    </Stack>
                </div>

                <div className='d-flex justify-content-center'>
                    <div className='w-75 mt-4'>
                        <p className='fw-bold text-grey'>
                            Description
                        </p>
                        <p className='text-grey2'>
                            {trip?.desc}
                        </p>
                    </div>
                </div>

            </section>

            <section  >
                <div className='d-flex justify-content-center' >
                    <Stack className=' d-flex justify-content-between w-75' direction="horizontal" gap={2}>
                        <div className="">
                            <span className='fw-bold text-warning' >
                                {formatRupiah.format(trip?.priceTrip)}
                            </span>
                            <span className='fw-bold'>/ Person</span>
                        </div>
                        <div className="">
                            <div className='mb-2'>

                                <Button
                                    onClick={LessCounter}
                                    className='text-white fw-bold  me-2' variant="warning">
                                    -
                                </Button>
                                <span> {addPerson}</span>
                                <Button
                                    onClick={AddCounter}
                                    className='text-white fw-bold mx-3 ' variant="warning">
                                    +
                                </Button>
                                <Modal centered show={showWarning} onHide={handleCloseWarning}>
                                    <Modal.Body className='text-center'>
                                        <p>Sorry you have reached the quota limit</p>
                                        come back later or check out other options
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </Stack>
                </div>

                <div className='d-flex justify-content-center mt-2'>
                    <Stack className=' d-flex justify-content-between w-75' direction="horizontal" gap={2}>
                        <div className="fw-bold">
                            Total:
                        </div>
                        <div className="fw-bold text-warning">
                            {formatRupiah.format(trip?.priceTrip * addPerson)}
                        </div>
                    </Stack>

                </div>
                <div className='d-flex justify-content-center mt-5' >
                    <p className='w-75 text-end'>
                        <Button
                            // onClick={handleBuy}
                            // onClick={() => handleBuy()}
                            onClick=
                            // {(data) => handleBuy.mutate({ data })}
                            {() => handleBuy.mutate({ counter_qty: addPerson, total: trip?.priceTrip * addPerson, trip_id: trip?.id, user_id: state.user.id })}
                            className='text-white fw-bold ps-4 pe-4' variant="warning">Book Now
                        </Button>
                        {/* <Button
                            onClick={() => handleBuy.mutate({

                            })}
                            className='text-white fw-bold ps-4 pe-4' variant="warning">Book Now
                        </Button> */}
                    </p>
                </div>

            </section>
        </>

    )
}
