import { useState } from "react";

const BASE_LINK = 'http://127.0.0.1:8000'
const BASE_API = '/transaction'

const useTransaction = () => {
    const [transactions, setTransactions] = useState([])

    const loadTransactions = () => {
        fetch(`${BASE_LINK}${BASE_API}`)
            .then(response => response.json())
            .then(data => setTransactions(data))
    }

    const getSummary = async () => {
        const result = await fetch(`${BASE_LINK}${BASE_API}/summary`)
        const data = await result.json()
        return data;
    }

    const getMonthlySummary = async () => {
        const result = await fetch(`${BASE_LINK}${BASE_API}/summary/avg-amount-monthly`)
        const data = await result.json()
        return data;
    }

    const saveTransaction = (newTransaction) => {
        console.log(newTransaction)
        console.log(JSON.stringify(newTransaction))
        return fetch(`${BASE_LINK}${BASE_API}`, {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json',
                "Content-Type": 'application/json'

            }),
            body: JSON.stringify(newTransaction)
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
    }

    return {
        loadTransactions,
        getSummary,
        getMonthlySummary,
        saveTransaction,
        transactions
    }
};

export { useTransaction };
