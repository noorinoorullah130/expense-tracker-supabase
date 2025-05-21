import React, { useEffect, useState, useContext } from "react";
import ExpenseContext from "../context";
import { supabase } from "../supabase";

const ExpenseList = () => {
    const { totalBudget, allExpenses, fetchExpenses } =
        useContext(ExpenseContext);

    const handleRemoveExpense = async (id) => {
        const { error } = await supabase.from("expenses").delete().eq("id", id);

        if (error) console.log(error);

        fetchExpenses();
    };

    let totalAmount = 0;

    allExpenses.forEach((element) => {
        totalAmount = totalAmount + element.amount;
    });

    const budgetLeft = totalBudget - totalAmount;

    return (
        <div className="expense-list">
            <div className="budget-detail">
                <h3>Total Budget: {totalBudget.toLocaleString()}</h3>
                <h3>Total Expense: {totalAmount.toLocaleString()}</h3>
                <h3>Budget Left: {budgetLeft.toLocaleString()}</h3>
            </div>

            <h2 className="expense-history">Expense History:</h2>

            <div className="header">
                <h2 style={{ width: "30%" }}>#</h2>
                <h2>Expense Name</h2>
                <h2>Amount</h2>
                <h2>Action</h2>
            </div>

            <div className="list-container">
                {allExpenses.map((expense, index) => (
                    <div className="list" key={expense.id}>
                        <h3 style={{ width: "30%" }}>{index + 1}</h3>
                        <h3>{expense.expense}</h3>
                        <h3>{expense.amount.toLocaleString()}</h3>
                        <h3>
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveExpense(expense.id)}
                            >
                                Remove
                            </button>
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
