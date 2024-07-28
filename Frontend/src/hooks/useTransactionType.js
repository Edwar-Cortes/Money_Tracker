import { useState } from "react";

const BASE_LINK = 'http://127.0.0.1:8000'
const BASE_API = '/transaction_type'

const useTransactionType = () => {
    const [transactionsType, setTransactionsType] = useState([])

    const loadTransactionsType = () => {
        fetch(`${BASE_LINK}${BASE_API}/?limit=10&offset=0`)
            .then(response => response.json())
            .then(data => setTransactionsType(data))
    }

    

    return {
        loadTransactionsType,
        transactionsType
    }
};

export { useTransactionType };
