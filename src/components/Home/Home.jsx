import "./Home.css";
import React, { useState, useEffect } from "react";
import IncomeModal from "../Modal/IncomeModal";
import ExpenseModal from "../Modal/ExpenseModal";
import PieChartComponent from "../PieChart/PieChart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BarChartComponent from "../BarChart/BarChart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../Modal/EditModal";

const Home = () => {
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    const localStorageBalance = localStorage.getItem("balance");
    if (localStorageBalance) {
      setBalance(Number(localStorageBalance));
    }
  }, []);

  useEffect(() => {
    const totalExpense = expenses.reduce(
      (total, expense) => total + Number(expense.price),
      0
    );
    setExpense(totalExpense);
  }, [expenses]);

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setExpenseToEdit(expenseToEdit);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    setBalance((prev) => prev + Number(expenseToDelete.price));
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <div className="main">
          <div className="card-element">
            <div className="card-one">
              <h2 className="title-one" style={{ color: "#9DFF5B" }}>
                Wallet Balance: <CurrencyRupeeIcon />
                {balance}
              </h2>
              <button className="button-element-one" type="button">
                <IncomeModal setBalance={setBalance} />
              </button>
            </div>
            <div className="card-two">
              <h2 className="title-two">
                Expenses: <CurrencyRupeeIcon />
                {expense}
              </h2>
              <button className="button-element-two" type="button">
                <ExpenseModal
                  balance={balance}
                  setBalance={setBalance}
                  setExpenses={setExpenses}
                  expenses={expenses}
                />
              </button>
            </div>
          </div>
          <PieChartComponent data={expenses} className="chart" />
        </div>

        <div className="heading">
          <div style={{ display: "flex" }}>
            <h3>Recent Transactions</h3>
            <h3 style={{ marginLeft: "600px" }}> Top Expenses</h3>
          </div>
          <section
            style={{
              width: "1190px",
              height: "345px",
              marginTop: "10px",
              marginLeft: "32px",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                color: "#121212",
                width: "738px",
                height: "345px",
                marginTop: "10px",
                marginLeft: "32px",
                borderRadius: "15px",
                position: "absolute",
              }}
            >
              <ul>
                {expenses.map((expense) => (
                  <li key={expense.id} style={{ listStyleType: "none" }}>
                    <span>{expense.title}</span> -{" "}
                    <span>{expense.category}</span> -{" "}
                    <span>{expense.price}</span> - <span>{expense.date}</span>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      style={{
                        float: "right",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      onClick={() => handleEdit(expense.id)}
                      style={{
                        float: "right",
                        backgroundColor: "orange",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                width: "417px",
                height: "345px",
                marginTop: "10px",
                marginLeft: "850px",
                borderRadius: "15px",
                position: "absolute",
                backgroundColor: "white",
              }}
            >
              <BarChartComponent expenses={expenses} />
            </div>
          </section>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          balance={balance}
          setBalance={setBalance}
          setExpenses={setExpenses}
          expenses={expenses}
          expenseToEdit={expenseToEdit}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </>
  );
};

export default Home;
