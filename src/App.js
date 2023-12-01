import React from "react";
import "./App.css";
import useSWR from "swr";
import Converter from "./components/Converter";
import TableMain from "./components/TableMain";
import Footer from "./components/Footer";
import Header from "./components/Header";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const counterKey = "apiRequestCounter";
  const counter = parseInt(localStorage.getItem(counterKey)) || 0;
  const { data, error, isValidating } = useSWR("api/data.json", fetcher, {
    onError: (err, key, config) => {
      localStorage.setItem(counterKey, (counter + 1).toString());

      if ((counter + 1) % 5 === 0) {
        localStorage.removeItem(counterKey);
      }
    },
  });

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <TableMain data={data} />
      <Converter data={data} />
      <Footer />
    </>
  );
}

export default App;
