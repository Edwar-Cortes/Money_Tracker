import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useEffect, useState } from "react";
import { useTransaction } from "../../hooks/useTransaction";

const NewTransactionModalForm = ({ transacationsType }) => {
  const [transactionForm, setTransactionForm] = useState({
    type_id: "",
    account: "",
    category: "",
    description: "",
    quantity: 0,
    date: new Date().toLocaleString(),
    // "type_id": 1,
    // "account": "string",
    // "category": "string",
    // "description": "string",
    // "quantity": 123456,
    // "date": "2024-07-28"
  });
  const transactionsHook = useTransaction()

  const changeInput = (e) => {
    setTransactionForm(prev => ({
      ...prev,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }))
  }

  const submitForm = (e) => {
    e.preventDefault();

    transactionsHook.saveTransaction(transactionForm).then(response => {
      console.log(response)
    })
    console.log('Hola 1234')
  }

  useEffect(() => {
    console.log(transactionForm)
  }, [transactionForm])

  return (
    <>
      <DialogTitle>Nueva transacción</DialogTitle>
      <DialogContent>
        <DialogContentText>Agrega tus nuevas transacciones</DialogContentText>
        <Box component="form" id="newTransactionModalForm" onSubmit={submitForm}>
          <Stack direction={"column"} gap={1} mt={1}>
            <FormControl fullWidth required variant="standard">
              <InputLabel id="demo-simple-select-label">
                Transaction Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Transaction Type"
                name="type_id"
                value={transactionForm.type_id}
                onChange={(e) => changeInput(e)}
              >
                {transacationsType.map((transacationType) => (
                  <MenuItem value={transacationType.id} key={transacationType.id}>
                    {transacationType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Account"
              variant="standard"
              fullWidth
              required
              name="account"
              value={transactionForm.account}
              onChange={(e) => changeInput(e)}
            />
            <TextField
              id="standard-basic"
              label="Category"
              variant="standard"
              fullWidth
              required
              name="category"
              value={transactionForm.category}
              onChange={(e) => changeInput(e)}
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              multiline
              rows={4}
              fullWidth
              name="description"
              value={transactionForm.description}
              onChange={(e) => changeInput(e)}
            />
            <TextField
              id="standard-basic"
              label="Quantity"
              variant="standard"
              type="number"
              fullWidth
              required
              name="quantity"
              value={transactionForm.quantity}
              onChange={(e) => changeInput(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="standard-basic"
              label="Date"
              variant="standard"
              fullWidth
              name="date"
              type="date"
              value={transactionForm.date}
              onChange={(e) => changeInput(e)}
              required
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Cancelar</Button>
        <Button variant={"contained"} type="submit" form="newTransactionModalForm">Guardar</Button>
      </DialogActions>
    </>
  );
};

export { NewTransactionModalForm };
