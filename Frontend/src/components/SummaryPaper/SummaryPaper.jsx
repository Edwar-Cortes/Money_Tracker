import * as React from "react";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";


function SummaryPaper({ transactions }) {
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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 255,
        },
      }}
    >
      <Paper elevation={5} sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ margin: 0, textTransform: 'capitalize' }}
          color="primary"
          fontWeight="bold"
          >
            Montly {chartData[0]?.type}
        </Typography>
        <Typography 
          variant="boby1" 
          sx={{ margin: 0, textTransform: 'capitalize' }}
          color="#1C444F"
          fontWeight="bold"
          >
            $ {new Intl.NumberFormat().format(chartData[0]?.amount)}
          </Typography>
        <p style={{ margin: 0, color:'#9B9B9B'}}>{new Date().toDateString()}</p>
      </Paper>
      <Paper elevation={5} sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ margin: 0, textTransform: 'capitalize' }}
          color="primary"
          fontWeight="bold"
          >
            Montly {chartData[1]?.type}
        </Typography>
        <Typography 
          variant="boby1" 
          sx={{ margin: 0, textTransform: 'capitalize' }}
          color="#1C444F"
          fontWeight="bold"
          >
            $ {new Intl.NumberFormat().format(chartData[1]?.amount)}
          </Typography>
        <p style={{ margin: 0, color:'#9B9B9B'}}>{new Date().toDateString()}</p>
      </Paper>
      <Paper elevation={5} sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ margin: 0, textTransform: 'capitalize' }}
          color="primary"
          fontWeight="bold"
          >
            Montly {chartData[2]?.type}
        </Typography>
        <Typography 
          variant="boby1" 
          sx={{ margin: 0, textTransform: 'capitalize' }}
          color="#1C444F"
          fontWeight="bold"
          >
            $ {new Intl.NumberFormat().format(chartData[2]?.amount)}
          </Typography>
        <p style={{ margin: 0, color:'#9B9B9B'}}>{new Date().toDateString()}</p>
      </Paper>
    </Box>
  );
}

export { SummaryPaper };
