import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../../config/api'


export default function CardIncomeTrip() {

    const navigate = useNavigate()

    const formatRupiah = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    let { data: incomeTrips, refetch } = useQuery('incomeCache', async () => {
        const response = await API.get("/trips")
        return response.data.data
    })




    console.log("ini income trips: ", incomeTrips);

    let handleDelete = async (id) => {
        await API.delete(`/trip/` + id)
        window.location.reload()
        // navigate("/income-trip")
        // refetch()
    }




    return (
        <>
            <div className='mt-5 pt-5 mb-5 d-flex justify-content-center'>
                <Button onClick={() => navigate("/add-trip")} className='text-white fw-bold px-5' variant="warning">Add Trip</Button>
                <Button onClick={() => navigate("/add-country")} className='text-white fw-bold ms-2 px-4' variant="warning">Add Country</Button>
            </div>

            <section className='tour-card-section'>
                <h2 className='text-center p-5'>INCOME TRIP</h2>
                <div>
                    <div className="row">
                        {incomeTrips?.map((items) => (
                            <div className="col-sm-4 d-flex justify-content-center mb-5">
                                <Card className='border-0 pointer' style={{ width: '18rem' }}
                                >
                                    <Card.Img className='pointer' variant="top"
                                        src={items.image}
                                        alt='' />
                                    <Card.Body>
                                        <Card.Title>
                                            {items.title}
                                        </Card.Title>
                                        <div className='d-flex justify-content-between'>
                                            <span className='fw-bold text-warning' >
                                                {formatRupiah.format(items.priceTrip)}
                                            </span>
                                            <span className='fw-bold text-grey'>
                                                {items.country.name}
                                            </span>
                                        </div>
                                    </Card.Body>
                                    <div className='w-100 d-flex justify-content-between ps-2 pe-2 pb-2'>
                                        <Button
                                            onClick={() => { navigate(`/update-trip/${items.id}`) }}
                                            variant='warning' style={{ width: "45%" }}>Edit</Button>
                                        <Button
                                            onClick={() => {
                                                handleDelete(items.id)
                                            }}
                                            variant='danger' style={{ width: "45%" }}>delete
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
