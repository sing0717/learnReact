import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinValue, setCoinValue] = useState(0);
  const [invest, setInvest] = useState(0);

  const boxChange = (value) => {
    setCoinValue(value.target.value);
  };

  const inputChange = (value) => {
    setInvest(value.target.value * coinValue);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setCoinValue(json[0].quotes.USD.price);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select onChange={boxChange}>
        {coins.map((coin) => (
          <option value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            USD
          </option>
        ))}
      </select>
      <div>
        USD
        <input
          size="66"
          onChange={inputChange}
          placeholder="how much dollar YOU have?"
        />
        <div>
          <input size="66" placeholder={invest} readOnly />
        </div>
      </div>
    </div>
  );
}

export default App;
