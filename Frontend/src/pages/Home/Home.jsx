import { Grid, Paper } from "@mui/material";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect } from "react";

import { SummaryPaper } from "../../components/SummaryPaper/SummaryPaper";
import { SummaryPie } from "../../components/SummaryPie/SummaryPie";

const Home = () => {

  const transacationHook = useTransaction()
  let data = transacationHook.getMonthlySummary()
  
  useEffect(() => {
    transacationHook.loadTransactions()
    data = transacationHook.getMonthlySummary()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <h1>Home</h1>
        <SummaryPaper transactions={data}/>
      </Grid>
      <Grid item xs={12} md={6} >
        <h1>Graph</h1>
        <SummaryPie transactions={data}/>
      </Grid>
    </Grid>
  );
};

export { Home };
