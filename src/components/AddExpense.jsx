import React, { useContext, useState } from "react";
import { supabase } from "../supabase";
import ExpenseContext from "../context";

const AddExpense = () => {
    const [expenseDetails, setExpenseDetails] = useState({
        expense: "",
        amount: "",
    });

    const { fetchExpenses } = useContext(ExpenseContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase.from("expenses").insert([
            {
                expense: expenseDetails.expense,
                amount: expenseDetails.amount,
            },
        ]);

        if (error) console.log(error);

        fetchExpenses();

        setExpenseDetails({
            expense: "",
            amount: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseDetails((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form
            className="add-expense"
            onSubmit={handleSubmit}
            style={{ marginTop: "1.8rem" }}
        >
            <h1>Add Expense</h1>
            <label htmlFor="expense-title">Expense Title:</label>
            <input
                type="text"
                name="expense"
                value={expenseDetails.expense}
                onChange={handleInputChange}
                id="expense-title"
                placeholder="Enter expense title"
            />
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                name="amount"
                value={expenseDetails.amount}
                onChange={handleInputChange}
                id="amount"
                placeholder="Enter expense amount"
            />
            <button>Add Expense</button>
        </form>
    );
};

export default AddExpense;
