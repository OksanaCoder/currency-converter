import React, { useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import "./style.css";

const Converter = ({ data }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(data[0].ccy);
  const [toCurrency, setToCurrency] = useState(data[1].base_ccy);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    handleConvert();
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = () => {
    const fromCurrencyObject = data.find((item) => item.ccy === fromCurrency);
    const toCurrencyObject = data.find((item) => item.base_ccy === toCurrency);

    if (fromCurrencyObject && toCurrencyObject) {
      const fromRate = parseFloat(fromCurrencyObject.buy);
      const toRate = parseFloat(toCurrencyObject.sale);

      if (!isNaN(fromRate) && !isNaN(toRate)) {
        const result = (amount / fromRate) * toRate;
        setConvertedAmount(result.toFixed(2));
        return;
      }
    }

    setConvertedAmount(null);
  };

  return (
    <div className="wrapper">
      <div>
        <label>Change:</label>
        <div>
          <input type="number" value={amount} onChange={handleAmountChange} />
          <label>
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              {data.map((item, index) => (
                <option key={index} value={item.ccy}>
                  {item.ccy}
                </option>
              ))}
            </select>
          </label>
          <HiArrowsRightLeft style={{ margin: "0 20px 0 20px" }} />
        </div>
      </div>

      <div>
        <label>Get:</label>
        <div>
          {convertedAmount !== null && (
            <small>
              {convertedAmount} {toCurrency}
            </small>
          )}
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {data.map((item, index) => (
              <option key={index} value={item.base_ccy}>
                {item.base_ccy}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Converter;
