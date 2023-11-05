import React, { useState, useEffect } from "react";
import axios from "axios";

function OwesBox() {
    const [debtRecords, setDebtRecords] = useState([]);
    const [debts, setDebts] = useState([]);

    useEffect( () => {
        const fetchDebts = async () => {
            const res = await axios.get(`/split/debts`)
            const transactions = res.data
            const minTrans = calculateTransfers(transactions)
            console.log(minTrans)
            setDebts(minTrans)
        }
        fetchDebts()
    }, [])


    const calculateTransfers = (transactions) => {
        const result = backtrack(transactions, 0);
        return result
    };
    
    function backtrack(transactions, idx) {
        if (idx === transactions.length) 
            return [];
      
        let minTransactions = Infinity;
        let minResult = null;
      
        for (let i = idx + 1; i < transactions.length; i++) {
            // check if opposite signs and not 0
            if (transactions[i].amount * transactions[idx].amount < 0) {
                transactions[i].amount += transactions[idx].amount;

                const remainingTransactions = backtrack(transactions, idx + 1);
                // 
                if (remainingTransactions.length < minTransactions) {
                    minTransactions = remainingTransactions.length;
                    minResult = [
                        {
                            from: transactions[idx].name,
                            to: transactions[i].name,
                            amount: -transactions[idx].amount,
                        },
                        ...remainingTransactions,
                    ];
                }
                // undo the operation
                transactions[i].amount -= transactions[idx].amount;
            }
        }
      
        if (minResult) {
            return minResult;
        } else {
            return backtrack(transactions, idx + 1);
        }
    }

    return (
        <div className="owesBox">
            <h1>Who Owes Whom</h1>
            <div className="debts">
            {debts && debts.length > 0 ? (
                debts.map((record, index) => (
                    <div className="debt-box" key={index}>
                        {record.amount < 0
                            ? `${record.to} owes ${record.from}: ${-record.amount}₪`
                            : `${record.from} owes ${record.to}: ${record.amount}₪`
                        }
                    </div>
                ))
                ) : (
                    <div className="settled-up-message">All settled up</div>
                )}
            </div>
        </div>
    );
}

export default OwesBox;
