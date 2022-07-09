import { useState, useContext } from "react";
import { getCachedData } from "../data/api";
import { InterfaceContext } from "./_app";
import { ShopCard, ProgressComponent, ExampleDialog } from "../components";
import { StoreContext } from "../contexts/StoreContext";
import { fetchCoffeeShops } from "../utils";

export async function getStaticProps(context) {
  return {
    props: { loadedCoffeeShops: getCachedData("data") },
  };
}
// This can be implemented as a stream (WritableStream Interface). Hence the use of
// the Response object instead of having the API resolve the actual JSON

export default function Home({ loadedCoffeeShops }) {
  const [progressValue, setProgressValue] = useState(0);
  const { dialog, setDialog } = useContext(InterfaceContext);
  // NOT IMPLEMENTED OR USED

  const { state, dispatch } = useContext(StoreContext);

  const { nearShopsLoaded, fetchedShops, isFindingNearShops } = state;

  function findShops() {
    dispatch({ name: "SET_IS_FINDING_NEAR_SHOPS", content: true });
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      fetchCoffeeShops(coords, { dispatcher: dispatch });
    }, positionError);
  }

  function positionError(error) {
    // dispatch({name: 'SET_ERROR_GETTING_POSITION', content: true});
    console.log(error);
  }

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
        <h1 className="text-spaced">Shop Finder</h1>
        <p>Start browsing below</p>
      </div>
      {/* <div>
        <button className="btn-normal" onClick={openDialog}>
          Open Dialog
        </button>
      </div> */}
      <div>
        <button className="btn-normal" onClick={findShops}>
          {isFindingNearShops === false ? "Find Shops Near Me" : "Loading..."}
        </button>
      </div>
      {nearShopsLoaded === false ? (
        <h3>Toronto Stores</h3>
      ) : (
        <h3>{isFindingNearShops ? "Loading" : "Near Me"}</h3>
      )}
      <div className="shop-grid">
        {/* Refactor into separate, reusable rendering function */}
        {nearShopsLoaded === false && isFindingNearShops === false ? (
          <>
            <List
              data={loadedCoffeeShops}
              render={(item) => (
                <ShopCard key={item.id} data={item} placeholder={false} />
              )}
            />
          </>
        ) : isFindingNearShops === true ? (
          <>
            <List
              data={[1, 2, 3, 4, 5, 6]}
              render={(item) => <ShopCard key={item} placeholder={true} />}
            />
          </>
        ) : (
          <>
            <List
              data={fetchedShops}
              render={(item) => (
                <ShopCard key={item.id} data={item} placeholder={false} />
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}

function List({ data, render }) {
  return data.map((item) => render(item));
}
