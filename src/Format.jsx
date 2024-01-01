import React, { useState } from "react";

function Format() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        const formattedValue = new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(value);
        setInputValue(formattedValue);
    };

    return (
        <div>
            <label htmlFor="inputValue">Enter a value:</label>
            <input
                type="number"
                id="inputValue"
                name="inputValue"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
}

export default Format;
