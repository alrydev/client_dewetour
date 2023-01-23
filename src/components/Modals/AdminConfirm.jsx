import React from 'react'
import { API } from '../../config/api';
import { Modal, Card, Stack, Button, Col, Row, Table, } from 'react-bootstrap';
import iconBooking from '../../assets/images/iconBooking.png'
import { useQuery } from 'react-query';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Swal2 = withReactContent(Swal)

export default function AdminConfirm({ setConfirm, modalConfirm, dataModal }) {

    let { data: transactions, refetch } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })

    const handleApprove = async () => {
        try {
            const response = await API.patch(`approve/${dataModal.id}`)

            if (response?.status === 200) {
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'APPROVED',
                    showConfirmButton: false,
                    timer: 2000
                })
                setConfirm(false)
                refetch()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = async () => {
        try {
            const response = await API.patch(`cancel/${dataModal.id}`)

            if (response?.status === 200) {
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Booking Cancelled',
                    showConfirmButton: false,
                    timer: 2000
                })
                setConfirm(false)
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log("ini data aprove tidak", dataModal)
    const closeConfirm = () => setConfirm(false);
    return (
        <>

            <Modal size="lg" show={modalConfirm} onHide={closeConfirm}>
                <Modal.Body>
                    <div className='d-flex justify-content-center    '>
                        <Card body className='w-customm w-100 pt-5 mb-5 mt-5 d-flex justify-content-center'>
                            {/* section head */}
                            <section className='d-flex justify-content-between pb-4'>
                                <img src={iconBooking} alt=''></img>
                                <div className=''>
                                    <span className='fw-bold fs-5 p-3 d-block' >Booking</span>
                                </div>
                            </section>

                            <section className=''>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="">
                                        <Stack className='ms-3 me-3' gap={2}>
                                            <div className="">
                                                <p className='fw-bold' >
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <Button className='text-orange mt-4 mb-4' variant="warning" size="sm" disabled>
                                                    {dataModal?.status}
                                                </Button>
                                            </div>
                                        </Stack>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <Row className=" d-flex justify-content-between w-75">
                                            <Col sm={5}>
                                                <p className="fw-bold" >Date Trip</p>
                                                <p>{dataModal?.trip.dateTrip}</p>
                                            </Col>
                                            <Col sm={5}>
                                                <p className="fw-bold">Duration</p>
                                                <p>{dataModal?.trip.day} Day {dataModal?.trip.night} Night</p>
                                            </Col>
                                            <Col sm={5}>
                                                <p className="fw-bold">Accomodation</p>
                                                <p>Hotel {dataModal?.trip.accomodation} Nights</p>
                                            </Col>
                                            <Col sm={5}>
                                                <p className="fw-bold">Transporation</p>
                                                <p>{dataModal?.trip.transportation}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Stack>
                            </section>

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
                                            <td>{dataModal?.user.fullname}</td>
                                            <td>{dataModal?.user.gender}</td>
                                            <td>{dataModal?.user.phone}</td>
                                            <td className='fw-bold'  >Qty : </td>
                                            <td className='fw-bold text-center' >{dataModal?.counter_qty}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='fw-bold'>Total : </td>
                                            <td className='fw-bold text-danger text-center'>{dataModal?.total} </td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </section>
                            <div className='d-flex justify-content-end gap-2'>


                                {
                                    dataModal?.status === "success, approved" || dataModal?.status === "canceled by admin, wait for refunds" ?
                                        <>


                                        </>
                                        :
                                        <>

                                            <Button onClick={handleApprove} variant="success">approve</Button>
                                            <Button onClick={handleCancel} variant="danger">cancel</Button>
                                        </>
                                }

                            </div>
                        </Card>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
