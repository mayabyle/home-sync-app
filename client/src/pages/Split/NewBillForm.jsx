import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function NewBillForm() {
    const residents = ["maya","bar", "yael"]  //TODO get residents from db

    const navigate = useNavigate();
    const [desc, setDesc] = useState("")
    const [sum, setSum] = useState("")
    const [debts, setDebts] = useState(residents.reduce((acc, name) => {
        acc[name] = 0;
        return acc;
    }, {}))
    const [paidBy, setPaidBy] = useState(residents[0]);
    const [splitWay, setSplitWay] = useState("equally")

    const handleDebtChange = (e, name) => {
        const updatedDebts = { ...debts };
        updatedDebts[name] = Math.round(e.target.value * 100) / 100;
        setDebts(updatedDebts);
    };

    const calculateDebtsSum = () => {
        const debtValues = Object.values(debts);
        return debtValues.reduce((total, debt) => total + parseFloat(debt), 0);
    };

    const calculateDebt = () => {
        var calDebts = { ...debts };
        if (splitWay === "equally") {
            const amount = sum / residents.length;
            calDebts[paidBy] = sum - amount;
            residents.forEach((res) => {
                if (res !== paidBy) 
                    calDebts[res] = -amount;
            });
        } else {
            residents.forEach((res) => {
                if (res !== paidBy) 
                    calDebts[res] = -debts[res];
                else 
                    calDebts[res] = sum - debts[paidBy];
            });
        }
        return calDebts;
    };


    const handleSubmit = () => {
        if (!desc || !sum) {
            alert("Missing fields");
        } else if (splitWay === "unequally" && calculateDebtsSum() !== parseFloat(sum)) {
            alert("Debt sum does not match the total sum");
        } 
        else {
            const currentDate = new Date()
            const calDebts = calculateDebt()
            
            const requestData = {
                desc: desc,
                sum: sum,
                date: currentDate.getDate()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getFullYear(),
                paidBy: paidBy,
                splitWay: splitWay,                
                debts: calDebts,
            };
            axios.post(`/split`, requestData)
                .then((res) => {
                  console.log('Response:', res.data);
                  navigate('/split');
                })
                .catch((err) => {
                  console.error('Error:', err);
                });
        }
    }
    
    return (
        <div classdesc="newBillForm" style={{ display: "flex",
                                        flexDirection: "column",
                                        width: "40%",
                                        margin: "0 auto",
        }}>
            <input
                desc="descBill"
                value={desc}
                required
                placeholder="desc of the bill"
                classdesc="form-control"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setDesc(e.target.value)}
            />
    
            <input
                type="number"
                desc="total"
                value={sum}
                required
                placeholder="Total sum"
                classdesc="form-control"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setSum(e.target.value)}
            />
    
            <div classdesc="splitBox">
                <div classdesc="splitInputs">
                    <div classdesc="custom-control custom-radio custom-control-inline">
                        <input
                            id="equally"
                            type="radio"
                            value="equally"
                            classdesc="custom-control-input"
                            onChange={(e) => setSplitWay(e.target.value)}
                            checked={splitWay === "equally"}
                        />
                        <label htmlFor="equally" classdesc="custom-control-label">
                            Equally
                        </label>
                    </div>
    
                    <div classdesc="custom-control custom-radio custom-control-inline">
                        <input
                            id="unequally"
                            type="radio"
                            value="unequally"
                            classdesc="custom-control-input"
                            onChange={(e) => setSplitWay(e.target.value)}
                            checked={splitWay === "unequally"}
                        />
                        <label htmlFor="unequally" classdesc="custom-control-label">
                            Unequally
                        </label>
                    </div>
                </div>
    
                {splitWay === "unequally" && (
                    <ul classdesc="unequallyInputs">
                        {residents.map((resident) => (
                            <li key={resident}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "10px",
                                }}>                      
                                    {resident}
                                <input
                                    type="number"
                                    value={debts[resident]}
                                    data-indx={resident}
                                    classdesc="custom-control-input"
                                    style={{ marginLeft: "10px" }}
                                    onChange={(e) => handleDebtChange(e, resident)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
    
                <div classdesc="form-group">
                    <label>Paid By</label>
                    <select classdesc="form-control" 
                        value={paidBy} onChange={(e) => setPaidBy(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    >
                        {residents.map((resident) => (
                            <option key={resident} value={resident}>
                                {resident}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button classdesc="btn btn-primary"
                onClick={handleSubmit} 
                style={{ width: "100px", alignSelf: "center" }}
            >
                Submit
            </button>
            
        </div>
    );
}
    
export default NewBillForm;