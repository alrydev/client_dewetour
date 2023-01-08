import React from 'react'

import iconBooking from '../assets/images/iconBooking.png'
import barcode from '../assets/images/barcode.png'
import { API } from '../config/api'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

import { Card, Stack, Button, Row, Col, Table } from 'react-bootstrap'
import { useQuery } from 'react-query'

export default function CardHistoryTrip() {

    const [state,] = useContext(UserContext)

    let { data: history } = useQuery('historyCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })

    // console.log("ini data history", history)

    let filteredHistory = history?.filter(function (e) {
        return e.userId === state.user.id && (e.status === "success, approved" || e.status === "canceled by admin, wait for refunds")
    })

    // console.log("ini historyfiltered ", filteredHistory);


    const formatRupiah = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    function dates(dateformat) {
        let tahun = dateformat.substring(0, 4);
        let bulan = dateformat.substring(5, 7);
        let tanggal = dateformat.substring(8, 10);

        let namaBulan = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        return `${tanggal} ${namaBulan[parseInt(bulan) - 1]} ${tahun}`;
    }


    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }
        return date.toLocaleString('default', options);
    }


    return (
        <>
            <div className='d-flex justify-content-center mt-5'>
                <p className='fw-bold fs-5 w-75' >HISTORY TRIP</p>
            </div>
            {filteredHistory?.map((items) => (
                <div className='d-flex justify-content-center  mt-0 mb-0'>

                    <Card body className='w-75 pt-5 mb-5 mt-5 d-flex justify-content-center'>
                        {/* section head */}
                        <section className='d-flex justify-content-between pb-4'>
                            <img src={iconBooking} alt=''></img>
                            <div className=''>
                                <span className='fw-bold fs-5  d-block' >Booking</span>
                                <span className='d-block'>
                                    <span className=''>{formatDate(items.created_at)}</span>
                                </span>
                            </div>
                        </section>

                        <section className=''>
                            <Stack direction="horizontal" gap={3}>
                                <div className="">
                                    <Stack className='ms-3 me-3' gap={2}>
                                        <div className="">
                                            <p className='fw-bold' >
                                                {items.trip.title}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            {
                                                items.status === "canceled by admin, wait for refunds" ?
                                                    <Button className='text-white mt-4 mb-4 px-5' variant="danger" size="sm" disabled>
                                                        {items.status}
                                                    </Button>
                                                    : (
                                                        <Button className='text-white mt-4 mb-4 px-5' variant="success" size="sm" disabled>
                                                            {items.status}
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
                                                {dates(items.trip.dateTrip)}
                                            </p>
                                        </Col>
                                        <Col sm={5}>
                                            <p className="fw-bold">Duration</p>
                                            <p>
                                                {items.trip.day} Day {items.trip.night} Night
                                            </p>
                                        </Col>
                                        <Col sm={5}>
                                            <p className="fw-bold">Accomodation</p>
                                            <p>
                                                {items.trip.accomodation}
                                            </p>
                                        </Col>
                                        <Col sm={5}>
                                            <p className="fw-bold">Transporation</p>
                                            <p>
                                                {items.trip.transportation}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="fs-5 d-flex justify-content-center">
                                    <div className="input-group mb-3 text-center">
                                        {/* <label for="upload-photo">
                                            <BsFileImage />
                                            <p className='fw-light' >upload payment proof</p>
                                        </label> */}
                                        <img src={barcode} alt=''></img>
                                        {/* <input hidden type="file" name="photo" id="upload-photo" /> */}
                                    </div>
                                </div>
                            </Stack>
                        </section>

                        {/* section total & profile */}
                        <section className='mt-4'>
                            <Table >
                                <tbody className='widthbooking'>
                                    <tr>
                                        <td className="fw-bold" >id</td>
                                        <td className="fw-bold">Fullname</td>
                                        <td className="fw-bold">Gender</td>
                                        <td className="fw-bold">Phone</td>
                                    </tr>
                                    <tr>
                                        <td>{items.id}</td>
                                        <td>
                                            {items.user.fullname}
                                        </td>
                                        <td>
                                            {items.user.gender}
                                        </td>
                                        <td>
                                            {items.user.phone}
                                        </td>
                                        <td className='fw-bold'  >Qty : </td>
                                        <td className='fw-bold text-center' >
                                            {items.counter_qty}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='fw-bold'>Total : </td>
                                        <td className='fw-bold text-danger text-center'>
                                            {formatRupiah.format(items.total)}
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        </section>
                    </Card>

                </div>
            ))}

        </>
    )
}
