import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function SummaryPie({ transactions }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await transactions;
                const processedData = data.map(transaction => ({
                    type: transaction.type,
                    amount: transaction.average_monthly_amount,
                    percentage: transaction.percentage,
                }));
                setChartData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [transactions]);

    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: chartData[0]?.percentage, label: chartData[0]?.type.toUpperCase() },
                        { id: 1, value: chartData[1]?.percentage, label: chartData[1]?.type.toUpperCase() },
                        { id: 2, value: chartData[2]?.percentage, label: chartData[2]?.type.toUpperCase() },
                    ],
                },
            ]}
            width={800}
            height={400}
        />
    );
};

export { SummaryPie };