import { Grid } from "@mui/material";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect, useState } from "react";
//import { TransactionsTable } from "../../components/TransactionsTable/TransactionsTable";
import { SummaryChart } from "../../components/SummaryChart/SummaryChart";
import { TransactionsTable } from "../../components/TransactionsTable/TransactionsTable";
import { Modal } from "../../components/Modal/Modal";
import { NewTransactionModalForm } from "../../components/NewTransactionModalForm/NewTransactionModalForm";
import { useTransactionType } from "../../hooks/useTransactionType";

const Daschboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const transacationHook = useTransaction();
  const transacationTypeHook = useTransactionType();
  const transactions = transacationHook.transactions;
  const transactionsType = transacationTypeHook.transactionsType;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    transacationHook.loadTransactions();
    transacationTypeHook.loadTransactionsType();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <h2>Dashboard</h2>
          <TransactionsTable
            transactions={transacationHook.transactions}
            handleOpenModal={handleOpenModal}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SummaryChart />
        </Grid>
      </Grid>
      <Modal open={openModal} handleClose={handleCloseModal}>
        <NewTransactionModalForm transacationsType={transactionsType} />
      </Modal>
    </>
  );
};

export { Daschboard };
