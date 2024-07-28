import { useEffect, useState } from "react";
import { useTransaction } from "../../hooks/useTransaction";
import { LineChart } from "@mui/x-charts/LineChart";

function SummaryChart() {
  const [transactionsSummary, setTransactionsSummary] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartXAxis, setChartXAxis] = useState([]);
  const [chartDataPoints, setChartDataPoints] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const transactionHook = useTransaction();

  const convertDataToChart = (transactionsSummary) => {
    const labels = [...new Set(transactionsSummary.map((item) => item.type))];
    const dates = [...new Set(transactionsSummary.map((item) => item.date))];
    console.log(dates.slice(0, 6));
    const dataPoints = {};

    labels.map((label) => {
      dataPoints[label] = [];
    });

    dates.map((date) => {
      labels.map((label) => {
        const data = transactionsSummary.find(
          (item) => item.date === date && item.type === label
        );
        if (data) {
          dataPoints[label].push(data.total_amount);
        } else {
          dataPoints[label].push(0);
        }
      });
    });

    setChartLabels(labels);
    setChartXAxis(dates);
    setChartDataPoints(dataPoints);
  };

  useEffect(() => {
    transactionHook.getSummary().then((data) => {
      setTransactionsSummary(data);
    });
  }, []);

  useEffect(() => {
    if (transactionsSummary.length === 0) return;
    convertDataToChart(transactionsSummary);
  }, [transactionsSummary]);

  useEffect(() => {
    if (
      chartXAxis.length < 0 &&
      chartLabels.length < 0 &&
      chartDataPoints[chartLabels[0]].length === chartXAxis.length
    )
      return;

    const series = chartLabels.map((label) => {
      return {
        id: label,
        label: label,
        data: chartDataPoints[label].slice(0, 10).reverse(),
        stack: "total",
        showMark: true,
        curve: 'linear'
      };
    });
    console.log(series);
    setChartSeries([...series]);
  }, [chartXAxis, chartLabels, chartDataPoints]);
  return (
    <div>
      <h2>Resumen</h2>
      {chartSeries.length > 0 && (
        <LineChart
          xAxis={[
            {
              id: "Fecha",
              data: chartXAxis.map(dataXAxis => new Date(dataXAxis)).slice(0, 10).reverse(),
              scaleType: 'time',
              valueFormatter: (date) => `${date.toLocaleString('default', { month: 'long' })} ${date.getUTCDate() + 1}`

            },
          ]}
          series={chartSeries}
          width={500}
          height={300}
          margin={{ left: 80 }}
        />
      )}
    </div>
  );
}

export { SummaryChart };
