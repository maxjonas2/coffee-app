import { useEffect, useState, useContext } from "react";
import { getData } from "../data/api";
import { InterfaceContext } from "./_app";
import { ShopCard, ProgressComponent, ExampleDialog } from "../components";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeShops: await getData("coffeeShops").then((response) =>
        response.json()
      ),
    },
  };
}
// This can be implemented as a stream (WritableStream Interface). Hence the use of
// the Response object instead of having the API resolve the actual JSON

export default function Home({ coffeeShops }) {
  const [progressValue, setProgressValue] = useState(0);

  const { dialog, setDialog } = useContext(InterfaceContext);

  useEffect(() => {
    // getData("coffeeShops").then((data) => {
    //   setListData(data);
    // });
    // This is not necessary because the data has been pre-generated on the server and passed to the component as a prop
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
    <div className="app-container flow">
      <div className="flow">
        <h1>Shop Finder</h1>
        <p>Start browsing below</p>
      </div>
      <div>
        <button className="btn-normal" onClick={openDialog}>
          Open Dialog
        </button>
      </div>
      {coffeeShops.length === 0 ? (
        <p>Loading</p>
      ) : (
        <>
          <h3>Toronto Stores</h3>
          <div className="shop-grid">
            <List
              data={coffeeShops}
              render={(item) => <ShopCard key={item.id} data={item} />}
            />
          </div>
        </>
      )}
    </div>
  );
}

function List({ data, render }) {
  return data.map((item) => render(item));
}
