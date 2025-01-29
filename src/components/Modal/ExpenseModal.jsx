import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useSnackbar } from "notistack";
import EditModal from "../Modal/EditModal";

const style = {
  position: "absolute",
  width: "538px",
  height: "340px",
  marginTop: "250px",
  marginLeft: "371px",
  borderRadius: "15px",
  backgroundColor: "#EFEFEFD9",
  padding: "20px",
};

export default function ExpenseModal({
  balance,
  setBalance,
  setExpenses,
  expenses,
}) {
  const [open, setOpen] = React.useState(false);
  const [expenseData, setExpenseData] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
    id: Date.now(),
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const name = e.target.name;
    setExpenseData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (balance < Number(expenseData.price)) {
      enqueueSnackbar("Exceeding Balance limit", { variant: "warning" });
      setOpen(false);
      return;
    }

    setBalance((prev) => prev - Number(expenseData.price));

    // Add new expense
    setExpenses((prev) => [...prev, expenseData]);

    // Reset form
    setExpenseData({
      title: "",
      category: "",
      price: "",
      date: "",
      id: Date.now(),
    });

    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} type="button">
        + Add Expense
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <Typography
            variant="h6"
            style={{
              marginBottom: "20px",
              color: "#000000",
              fontFamily: "Ubuntu",
              fontSize: "30px",
              marginLeft: "10px",
              fontWeight: 700,
            }}
          >
            Add Expenses
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={expenseData.title}
              placeholder="Title"
              onChange={handleChange}
              required
              style={{
                width: "220px",
                height: "50px",
                marginBottom: "10px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={expenseData.price}
              onChange={handleChange}
              required
              style={{
                width: "220px",
                height: "50px",
                marginBottom: "10px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
            />
            <select
              style={{
                width: "220px",
                height: "50px",
                marginBottom: "10px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
            </select>
            <input
              type="date"
              name="date"
              value={expenseData.date}
              style={{
                width: "220px",
                height: "50px",
                marginBottom: "10px",
                marginLeft: "10px",
                borderRadius: "15px",
              }}
              onChange={handleChange}
              required
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                style={{
                  width: "220px",
                  height: "50px",
                  marginBottom: "10px",
                  borderRadius: "15px",
                  backgroundColor: "#F4BB4A",
                }}
              >
                Add Expense
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                style={{
                  width: "110px",
                  height: "50px",
                  borderRadius: "15px",
                  backgroundColor: "#E3E3E3",
                  marginLeft: "10px",
                  color: "#000000",
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
