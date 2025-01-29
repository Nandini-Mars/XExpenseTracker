import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  width: "538px",
  height: "164px",
  marginTop: "296px",
  marginLeft: "371px",
  borderRadius: "15px",
  backgroundColor: "#EFEFEFD9",
  padding: "20px", // Added padding for better alignment
};

export default function IncomeModal({ setBalance }) {
  const [open, setOpen] = React.useState(false);
  const [income, setIncome] = React.useState(""); // State for income input
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(income) <= 0) {
      enqueueSnackbar("Income should be greater than 0", {
        variant: "warning",
      });
      return;
    }
    setBalance((prev) => prev + Number(income)); // Update balance
    handleClose(); // Close the modal after submitting
  };

  return (
    <div>
      <Button onClick={handleOpen} type="button">
        + Add Income
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
              width: "170px",
              height: "34px",
              marginTop: "3px",
              marginLeft: "8px",
              marginBottom: "20px",
              color: "#000000",
              fontFamily: "Ubuntu",
              fontSize: "30px",
              fontWeight: 700,
              textAlign: "left",
            }}
          >
            Add Balance
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <input
              type="number"
              placeholder="Income Amount"
              value={income}
              onChange={(e) => setIncome(e.target.value)} // Update income state
              required
              style={{
                width: "210px",
                height: "50px",
                marginTop: "3px",
                marginLeft: "4px",
                borderRadius: "15px",
              }}
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                style={{
                  width: "145px",
                  height: "50px",
                  marginTop: "3px",
                  marginLeft: "8px",
                  borderRadius: "15px",
                  backgroundColor: "#F4BB4A",
                }}
              >
                Add Balance
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                variant="outlined"
                style={{
                  width: "110px",
                  height: "50px",
                  marginTop: "3px",
                  marginLeft: "8px",
                  borderRadius: "15px",
                  backgroundColor: "#E3E3E3",
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
