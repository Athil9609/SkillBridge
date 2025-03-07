import React, { useEffect, useState } from 'react'
import { transactionHistory } from '../../services/allApis';
import { Link } from 'react-router-dom';


function ViewTransactions() {

    useEffect(()=>{
        getData()
    },[])

    const[allTransactions,setAllTransactions]=useState([])

    const getData=async()=>{
        const header = {
            'Content-type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
          };

          const res=await transactionHistory(header)
          console.log(res)
          if(res.status==200){
            setAllTransactions(res.data)
          }
    }
  return (
    <>
    <div className='p-5 container-fluid'><h2>Transaction History</h2>
    
    <div className='d-flex justify-content-center align-items-center'>

        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Skill</th>
                    <th>Hours</th>
                    <th>Date/Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    allTransactions.length>0?
                    allTransactions.map((item,index)=>(
                        <tr>
                        <td>{index+1}</td>
                        <td><Link to={`/userdetails/${item.serviceProviderId}`}>{item.serviceProviderName}</Link></td>
                        <td><Link  to={`/userdetails/${item.serviceReceiverId}`}>{item.serviceReceiverName}</Link></td>
                        <td>{item.skillName}</td>
                        <td>{item.rate}Hrs</td>
                        <td>{new Date(item.transactionDateTime).toLocaleString()}</td>
                    </tr>
                    )):
                    <h2></h2>
                   }
            </tbody>
        </table>
    </div>
    
    </div>

    </>
  )
}

export default ViewTransactions