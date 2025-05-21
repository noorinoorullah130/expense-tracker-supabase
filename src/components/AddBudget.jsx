import React, { useContext, useState } from "react";

import { supabase } from "../supabase";
import ExpenseContext from "../context";

const AddBudget = () => {
    const [budget, setBudget] = useState("");

    const { fetchBudget } = useContext(ExpenseContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from("budget")
            .update({ budget })
            .eq("id", 2);

        if (error) console.log(error);

        setBudget("");
        fetchBudget();
    };

    return (
        <form className="add-budget" onSubmit={handleSubmit}>
            <h1>Add Budget</h1>
            <label htmlFor="budget">Budget:</label>
            <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter you budget"
                min={0}
            />
            <button>Add Budget</button>
        </form>
    );
};

export default AddBudget;
