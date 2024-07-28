import { Grid, Link } from "@mui/material";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const Info = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography
          variant="h4"
          sx={{ margin: 0, textTransform: "capitalize" }}
          color="primary"
          fontWeight="bold"
        >
          Information:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          Money Tracker: Your money, under control.
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
        >
          Ever wondered where your money goes? With a Money Tracker, you can
          keep a detailed record of your income and expenses, identifying where
          you can save and optimize your finances. Take control of your economy
          and reach your financial goals faster!
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          Objective of the project:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
        >
          This project is the result of my learning in the full stack
          programming course. I applied the knowledge acquired to create a
          practical tool that helps users manage their finances.
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          Applied technologies:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          - Backend:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
        >
          Python and SQLite. A powerful combination to create a robust and
          scalable backend. Python offers clear syntax and a wide variety of
          libraries, while SQLite provides a lightweight, easy-to-manage
          database.
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          - Frontend:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
        >
          React. A cutting-edge JavaScript library that allows you to build
          interactive and efficient user interfaces. React simplifies the
          development of complex web applications and ensures a smooth user
          experience.
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="h4"
          sx={{ margin: 0, textTransform: "capitalize" }}
          color="primary"
          fontWeight="bold"
        >
          Contact
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          Programmer:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize", gap: 4 }}
          color="#1C444F"
        >
          Ing. Jhon Edwar Velez Cortes
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          Cell Number:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
        >
          +57 3128941666
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          social networks:
        </Typography>
        <Typography
          sx={{ margin: 1, textTransform: "capitalize" }}
          color="#1C444F"
          fontWeight="bold"
        >
          - LinkedIn:
        </Typography>
        <Typography sx={{ margin: 2, textDecoration: "none" }} color="#1C444F">
          <a href="https://www.linkedin.com/in/jhon-edwar-velez-cortes-035040260">Edwar Cortes</a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export { Info };
