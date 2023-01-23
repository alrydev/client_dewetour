import React, { useState } from 'react'
import { Table, } from 'react-bootstrap'

import { API } from '../../config/api'
import { useQuery } from 'react-query'


import searchIcon from '../../assets/images/searchIcon.png'
import AdminConfirm from '../Modals/AdminConfirm'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'


export default function CardTransaction() {

    // ========================================================
    const [state, disptach] = useContext(UserContext)
    console.log("ini state", state);


    // =======================================================

    const [modalConfirm, setConfirm] = useState(false);

    const [dataModal, setDataModal] = useState(null)





    let { data: transactions, refetch } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions')
        return response.data.data
    })


    const handleClick = (items) => {
        setDataModal(items)
        setConfirm(true)
    }

    // if (isFetching) {
    //     return (
    //         <>
    //             Fetching cuy...
    //         </>
    //     )

    // }

    return (
        <>
            <div className='d-flex justify-content-center mt-5 pt-3 mb-3'>
                <h5 className='w-75 fw-bold mt-5'>Income Transaction</h5>
            </div>
            <div className='d-flex justify-content-center mb-5 pb-5'>

                <Table className='w-75' striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>id booking</th>
                            <th>Users</th>
                            <th>Trip</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((items, index) => (
                            <>
                                <tr>
                                    <td>
                                        {items.id}
                                    </td>
                                    <td>
                                        {items.user.fullname}
                                    </td>
                                    <td>
                                        {items.trip.title}
                                    </td>
                                    <td>
                                        {items.status}
                                    </td>
                                    <td className='text-center pt-2 pb-3' >
                                        <img className='pointer' onClick={() => handleClick(items)} src={searchIcon} alt='' />
                                    </td>
                                </tr>


                            </>
                        ))}



                    </tbody>
                </Table>
            </div>

            <AdminConfirm setConfirm={setConfirm} modalConfirm={modalConfirm} dataModal={dataModal} />
        </>
    )
}
