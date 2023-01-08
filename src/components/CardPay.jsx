import React, { useState, useEffect } from 'react'
import { Card, Stack, Row, Col, Button, Table, Modal } from 'react-bootstrap'
import { BsFileImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { API } from '../config/api';
import { useQuery } from 'react-query';

// import Iconlogo from '../assets/images/Iconlogo.png'
import iconBooking from '../assets/images/iconBooking.png'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function CardPay() {

    const [modalConfirm, setConfirm] = useState(false);

    const closeConfirm = () => setConfirm(false);
    const showConfirm = () => setConfirm(true);


    // get transaction waiting payment
    let { data: booking } = useQuery('bookingCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })


    // get data login
    const [state,] = useContext(UserContext)

    // data transaksi filter by id and status
    let filteredBooking = booking?.filter(function (e) {
        return e.userId === state.user.id
    })


    const navigate = useNavigate()

    const formatRupiah = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

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
                    // console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    // console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    // console.log(result);
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

            <div>
                {filteredBooking?.map((items, index) => (
                    <>
                        {
                            filteredBooking[index]?.status === "success" ?
                                <>

                                    <div className='d-flex justify-content-center pt-5 mt-5 mb-5'>
                                        <Card body className='w-75 pt-5 mb-5 mt-5 d-flex justify-content-center'>
                                            {/* section head */}
                                            <section className='d-flex justify-content-between pb-4'>
                                                <img
                                                    src={iconBooking} alt=''></img>
                                                <div className=''>
                                                    <span className='fw-bold fs-5 p-3 d-block' >Booking</span>
                                                    <span className='d-block'>
                                                        {/* <span className='fw-bold'>-</span>, 22 July 2020 */}
                                                    </span>
                                                </div>
                                            </section>

                                            {/* section info booking */}
                                            <section className=''>
                                                <Stack className=' d-flex justify-content-between me-5 ms-5' direction="horizontal" gap={2}>
                                                    <div className="">
                                                        <Stack className='ms-3 me-3' gap={2}>
                                                            <div className="">
                                                                <p className='fw-bold' >
                                                                    {filteredBooking[index].trip.title}
                                                                </p>
                                                            </div>
                                                            <div className="d-flex justify-content-start">
                                                                {filteredBooking[index]?.status === "success" ?
                                                                    <Button className='text-dark mt-4 mb-4' variant="warning" size="sm" disabled>
                                                                        payment success, waiting approve
                                                                    </Button>
                                                                    : filteredBooking[index]?.status === "pending" ?
                                                                        <Button className='text-light mt-4 mb-4' variant="warning" size="sm" disabled>
                                                                            {filteredBooking[index].status}
                                                                        </Button>
                                                                        : (
                                                                            <Button className='text-light mt-4 mb-4' variant="danger" size="sm" disabled>
                                                                                {filteredBooking[index].status}
                                                                            </Button>
                                                                        )

                                                                }
                                                            </div>
                                                        </Stack>
                                                    </div>
                                                    <div className='d-flex justify-content-center'>
                                                        <Row className=" d-flex justify-content-between w-75">
                                                            <Col sm={5}>
                                                                <p className="fw-bold" >Date Trip</p>
                                                                <p>
                                                                    {filteredBooking[index].trip.dateTrip}
                                                                </p>
                                                            </Col>
                                                            <Col sm={5}>
                                                                <p className="fw-bold">Duration</p>
                                                                <p>
                                                                    {filteredBooking[index].trip.day} Day {filteredBooking[index].trip.night} Night</p>
                                                            </Col>
                                                            <Col sm={5}>
                                                                <p className="fw-bold">Accomodation</p>
                                                                <p>
                                                                    {filteredBooking[index].trip.accomodation}
                                                                </p>
                                                            </Col>
                                                            <Col sm={5}>
                                                                <p className="fw-bold">Transporation</p>
                                                                <p>
                                                                    {filteredBooking[index].trip.transportation}
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Stack>
                                            </section>

                                            {/* section total & profile */}
                                            <section className='mt-4'>
                                                <Table >
                                                    <tbody className='widthbooking'>
                                                        <tr>
                                                            <td className="fw-bold" >No</td>
                                                            <td className="fw-bold">Fullname</td>
                                                            <td className="fw-bold">Gender</td>
                                                            <td className="fw-bold">Phone</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>{filteredBooking[index].user.fullname}
                                                            </td>
                                                            <td>
                                                                {filteredBooking[index].user.gender}
                                                            </td>
                                                            <td>
                                                                {filteredBooking[index].user.phone}
                                                            </td>
                                                            <td className='fw-bold'  >Qty : </td>
                                                            <td className='fw-bold text-center' >
                                                                {filteredBooking[index].counterQty}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td className='fw-bold'>Total : </td>
                                                            <td className='fw-bold text-danger text-center'>
                                                                {formatRupiah.format(filteredBooking[index].total)}
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </section>
                                        </Card>
                                    </div>

                                    <div className='w-80 d-flex justify-content-end mt-min mb-5'>
                                        {
                                            filteredBooking[index].status === "pending" ?
                                                <Button variant="warning" className="px-5 text-light fw-bold"
                                                    // onClick={handleBuy}
                                                    onClick=
                                                    // {(data) => handleBuy.mutate({ data })}
                                                    {() => handleBuy.mutate({ counter_qty: filteredBooking[index].counterQty, total: filteredBooking[index].total, trip_id: filteredBooking[index].trip_id, user_id: filteredBooking[index].user_id })}
                                                >PAY</Button>
                                                : " "
                                        }
                                    </div>
                                </>
                                :
                                " "

                        }
                    </>

                ))}


            </div>
            <h3>

            </h3>




            <Modal show={modalConfirm} centered onHide={closeConfirm}>

                <Modal.Body className='' >
                    <p className='d-flex justify-content-center'>Your payment will be confirmed witin 1 x 24 hours</p>
                    <p className='d-flex justify-content-center'>To see orders click<span onClick={() => navigate("/booking")} className='fw-bold pointer'>&nbsp; Here &nbsp;</span> thank you</p>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default CardPay