import { useEffect, useState } from "react";
import AddBudget from "./components/AddBudget";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseContext from "./context.js";

import { supabase } from "./supabase.js";

function App() {
    const [totalBudget, setTotalBudget] = useState(null);
    const [allExpenses, setAllExpenses] = useState([]);

    const fetchBudget = async () => {
        const { data, error } = await supabase
            .from("budget")
            .select("*")
            .single();

        if (error) console.log(error);

        setTotalBudget(data.budget);
        console.log(data);
    };

    const fetchExpenses = async () => {
        const { data, error } = await supabase.from("expenses").select("*");

        if (error) console.log(error);

        setAllExpenses(data);
    };

    useEffect(() => {
        fetchBudget();
        fetchExpenses();
    }, []);

    return (
        <>
            <h1 className="title">Budget Tracker System</h1>
            <ExpenseContext.Provider
                value={{ totalBudget, fetchBudget, fetchExpenses, allExpenses }}
            >
                <div className="container">
                    <div className="left-side">
                        <AddBudget />
                        <AddExpense />
                    </div>
                    <div className="right-side">
                        <ExpenseList />
                    </div>
                </div>
            </ExpenseContext.Provider>
        </>
    );
}

export default App;
