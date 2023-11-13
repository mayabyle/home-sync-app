import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import OwesBox from "../../components/OwesBox";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Split() {
    const [bills, setBills] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredBills, setFilteredBills] = useState([]);

    useEffect( () => {
        const fetchBills = async () => {
            const res = await axios.get(`/split`)
            setBills(res.data)
            setFilteredBills(res.data); // Initialize filteredBills with all bills
        }
        fetchBills()
    }, [])

    useEffect(() => {
        filterBills();
    }, [searchInput, bills]);

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
            const res = await axios.delete(`/split/${bill.id}?bill=${JSON.stringify(bill)}`);
            const updatedBills = [...bills];
            updatedBills.splice(index, 1);
            setBills(updatedBills);
        } catch(e) {
            console.log(e)
        }
    }

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filterBills = () => {
        const filtered = bills.filter((bill) =>
            bill.desc.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredBills(filtered);
    };


    return (
        <div className="split">
            <OwesBox bills={bills}/>
            <h2>All bills</h2>
            <div className="expense-container">
                {filteredBills.map((bill, indx) => (
                    <div key={indx} className="bill">
                        <div className="content">
                            <button type="button" onClick={() => handleAmountChange(indx)}>
                              <b>{bill.desc}:</b> {bill.sum}&#8362;
                            </button>
                            <a>{bill.date}</a>
                            <button type="button" onClick={() => handlePaidByChange(indx)}>
                              Paid By:{" "} {bill.paidBy}
                            </button>
                        </div>
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(bill, indx)} />
                    </div>
                ))}
            </div>
            <div style={{display:'flex'}}>
                {bills.length>0 && <input
                    type="text"
                    placeholder="Type to search.."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    style={{display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#b9e7e7',
                        color: 'rgba(0, 128, 128, 0.766)',
                        borderBottom: '1px solid #f1f1f1',
                        padding: '5px',
                        border: 'none',
                        fontSize: '16px',
                        borderRadius:'10%'
                        }}
                />}
                <Link to="/split/newBill" style={{backgroundColor:'rgba(0, 128, 128, 0.766)', color:'black', borderRadius:'70%', marginLeft:'30px',  textDecoration: 'none', padding:'10px'}}>Add</Link>
            </div>        
        </div>
    )

}

export default Split;