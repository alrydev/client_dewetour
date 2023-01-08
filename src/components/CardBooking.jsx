import React from 'react'
import { Card, Stack, Row, Col, Button, Table } from 'react-bootstrap'
import { BsFileImage } from 'react-icons/bs';
// import Iconlogo from '../assets/images/Iconlogo.png'
import iconBooking from '../assets/images/iconBooking.png'

function CardBooking() {

    return (
        <>
            <div className='d-flex justify-content-center pt-5 mt-5 mb-5'>
                <Card body className='w-75 pt-5 mb-5 mt-5 d-flex justify-content-center'>
                    {/* section head */}
                    <section className='d-flex justify-content-between pb-4'>
                        <img src={iconBooking} alt=''></img>
                        <div className=''>
                            <span className='fw-bold fs-5 p-3 d-block' >Booking</span>
                            <span className='d-block'>
                                {/* <span className='fw-bold'>-</span>, 22 July 2020 */}
                            </span>
                        </div>
                    </section>

                    {/* section info booking */}
                    <section className=''>
                        <Stack direction="horizontal" gap={3}>
                            <div className="">
                                <Stack className='ms-3 me-3' gap={2}>
                                    <div className="">
                                        <p className='fw-bold' >6D/4N Fun Tassie Vacation</p>
                                        {/* <p className='fw-light' >{Booking[0].country}</p> */}
                                    </div>
                                    <div className="d-flex justify-content-start">
                                        <Button className='text-orange mt-4 mb-4' variant="warning" size="sm" disabled>
                                            Waiting Payment
                                        </Button>
                                    </div>
                                </Stack>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Row className=" d-flex justify-content-between w-75">
                                    <Col sm={5}>
                                        <p className="fw-bold" >Date Trip</p>
                                        <p>26 Agustus 2020</p>
                                    </Col>
                                    <Col sm={5}>
                                        <p className="fw-bold">Duration</p>
                                        <p>6 Day 4 Night</p>
                                    </Col>
                                    <Col sm={5}>
                                        <p className="fw-bold">Accomodation</p>
                                        <p>Hotel 4 Nights</p>
                                    </Col>
                                    <Col sm={5}>
                                        <p className="fw-bold">Transporation</p>
                                        <p>Qatar Airways</p>
                                    </Col>
                                </Row>
                            </div>

                            <div className="fs-5 d-flex justify-content-center">
                                <div className="input-group mb-3 text-center">
                                    <label for="upload-photo">
                                        <BsFileImage />
                                        <p className='fw-light' >upload payment proof</p>
                                    </label>
                                    <input hidden type="file" name="photo" id="upload-photo" />
                                </div>
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
                                    <td>Alri</td>
                                    <td>Male</td>
                                    <td>081234</td>
                                    <td className='fw-bold'  >Qty : </td>
                                    <td className='fw-bold text-center' >1</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='fw-bold'>Total : </td>
                                    <td className='fw-bold text-danger text-center'>IDR. 12.398.000 </td>
                                </tr>

                            </tbody>
                        </Table>
                    </section>
                </Card>
            </div>
        </>
    )
}

export default CardBooking