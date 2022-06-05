import { useEffect, useState } from "react";
import { getData } from "../data/api";
import Link from "next/link";

export default function Home() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    getData("coffeeShops").then((data) => {
      setListData(data);
    });
  }, []);

  return (
    <div className="app-container">
      <Hero />
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
