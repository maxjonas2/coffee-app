import { useEffect, useState, useContext } from "react";
import { getData } from "../data/api";
import Link from "next/link";
import { InterfaceContext } from "./_app";

export default function Home() {
  const [listData, setListData] = useState([]);
  const [progressValue, setProgressValue] = useState(0);

  const { dialog, setDialog } = useContext(InterfaceContext);

  useEffect(() => {
    getData("coffeeShops").then((data) => {
      setListData(data);
    });
  }, []);

  function openDialog() {
    setDialog(
      false ? (
        <ExampleDialog />
      ) : (
        <div className="dialog">
          <ProgressComponent setDialog={setDialog} value={progressValue} />
        </div>
      )
    );
  }

  return (
    <div className="app-container">
      <Hero />
      <div>
        <button onClick={openDialog}>Open Dialog</button>
      </div>
      {listData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="shop-grid">
          <List
            data={listData}
            render={(item) => <ShopCard key={item.id} data={item} />}
          />
        </div>
      )}
    </div>
  );
}

function ProgressComponent({ setDialog }) {
  const [value, setValue] = useState(0);

  let timerRef;

  useEffect(() => {
    if (value >= 100) {
      setDialog(null);
      return () => clearTimeout(timerRef);
    }

    timerRef = setTimeout(() => {
      setValue((value) => value + 5);
    }, 1000);

    return () => clearTimeout(timerRef);
  }, [value]);

  return (
    <div className="flow">
      <progress max={100} value={value}></progress>
      <div>
        <button onClick={() => setDialog(null)}>Close</button>
      </div>
    </div>
  );
}

function ExampleDialog() {
  return (
    <div className="dialog">
      <h2>Dialog Content</h2>
      <p>This is some dialog content</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button onClick={() => setDialog(null)}>Close</button>
    </div>
  );
}

function ShopCard({ data }) {
  const { id, name, imgUrl, websiteUrl, address, neighborhood } = data;

  return (
    <Link href={`/shops/${id}`}>
      <div className="card" role={"link"}>
        <h3>{name}</h3>
        <p className="text-faded">
          <strong>{neighborhood}</strong>
        </p>
        <p className="text-faded">{address}</p>
        <img src={imgUrl} height="220" alt="Image showing coffee" />
      </div>
    </Link>
  );
}

function List({ data, render }) {
  return data.map((item) => render(item));
}

function Hero() {
  return (
    <div>
      <h1>Hello</h1>
      <h3>Welcome to Shop Finder</h3>
      <p>Start browsing below</p>
    </div>
  );
}
