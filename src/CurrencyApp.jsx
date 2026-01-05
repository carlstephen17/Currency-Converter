import React, { useState } from "react";
import "./assets/CurrencyApp.css";
import currencies from "./data/Currencies";
function CurrencyApp() {
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);

    /* original url
       https://open.er-api.com/v6/latest/USD
    */
   
    async function handleCalculate() {
        if (!fromCurrency || !toCurrency || !amount) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
            if (!response.ok) throw new Error("Failed to fetch exchange rates");
            const data = await response.json();
            console.log('Fetched Data:', data)


            const rate = data.rates[toCurrency];
            if (!rate) {
                alert(`Exchange rate for ${toCurrency} not found`);
                return;
            }

            const converted = (parseFloat(amount) * rate).toFixed(2);
            setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
        } catch (error) {
            alert("Error fetching exchange rates");
            console.error(error);
        }
    }

    return (
        <div className="container">
            <h2>Currency Converter</h2>

            <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className="select">
                <option value="">From Currency</option>
                {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="input"
            />

            <select value={toCurrency} onChange={e => setToCurrency(e.target.value)} className="select">
                <option value="">To Currency</option>
                {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>

            <button onClick={handleCalculate} className="button">
                Calculate
            </button>

            {result && <p className="result">{result}</p>}
        </div>
    );
}

export default CurrencyApp;
