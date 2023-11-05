import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import OwesBox from "../../components/OwesBox";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Split() {
    const [bills, setBills] = useState([]);

    useEffect( () => {
        const fetchBills = async () => {
            const res = await axios.get(`/split`)
            console.log(res.data)
            setBills(res.data)
        }
        fetchBills()
    }, [])

    const handleAmountChange = (index) => {
        console.log("handleAmountChange")
        // Implement logic to change the bill amount
        // You can open a modal or a form for editing the amount
    };

    const handlePaidByChange = (index) => {
        console.log("handlePaidByChange")
        // Implement logic to change who paid
        // You can open a modal or a form for changing the payer
    };

    const handleDelete = async (bill, index) => {
        try {
            console.log(bill.debts)
            axios.delete(`/split/${bill.id}`, bill.debts)
            const updatedBills = [...bills];
            updatedBills.splice(index, 1);
            setBills(updatedBills);
        } catch(e) {
            console.log(e)
        }
    }


    return (
        <div className="split">
            <OwesBox/>
            <h2>All bills</h2>
            <div className="expense-container">
                {bills.map((bill, indx) => (
                    <div key={indx} className="bill">
                        <button type="button" onClick={() => handleAmountChange(indx)}>
                          <b>{bill.desc}:</b> {bill.sum}&#8362;
                        </button>
                        <a>{bill.date}</a>
                        <button type="button" onClick={() => handlePaidByChange(indx)}>
                          Paid By:{" "} {bill.paidBy}
                        </button>
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(bill, indx)} />
                    </div>
                ))}
            </div>
            {/* TODO add search bar */}
            <Link to="/split/newBill" style={{backgroundColor:'rgba(0, 128, 128, 0.766)', color:'black', borderRadius:'70%'}}>Add</Link>        
        </div>
    )

}

export default Split;