import { useEffect, useState, useContext, Suspense } from "react";
import { getCachedData } from "../data/api";
import { InterfaceContext } from "./_app";
import { ShopCard, ProgressComponent, ExampleDialog } from "../components";
import { StoreContext } from "../contexts/StoreContext";

export async function getStaticProps(context) {
  return {
    props: { loadedCoffeeShops: getCachedData("data") },
  };
}
// This can be implemented as a stream (WritableStream Interface). Hence the use of
// the Response object instead of having the API resolve the actual JSON

function parseFetchResults(data) {
  return data.map((item) => ({
    id: item.fsq_id,
    name: item.name,
    address: item.location.address,
    imgUrl: "/assets/cafe_image.jpg",
  }));
}

export default function Home({ loadedCoffeeShops }) {
  const [progressValue, setProgressValue] = useState(0);
  const { dialog, setDialog } = useContext(InterfaceContext);
  // NOT IMPLEMENTED OR USED

  const [isFindingNearShops, setIsFindingNearShops] = useState(false);
  const { state, dispatch } = useContext(StoreContext);

  const { nearShopsLoaded, fetchedShops } = state;

  function findShops() {
    setIsFindingNearShops(true);
    navigator.geolocation.getCurrentPosition(positionSuccesss, positionError);
  }

  function positionSuccesss({ coords }) {
    fetch(
      `https://api.foursquare.com/v3/places/search?query=coffee&ll=${coords.latitude},${coords.longitude}&radius=30000`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "fsq3BSwgkrfBE9GJ+5DS0TmmTIKquB0TYjPYPlVIo/u9/yk=",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // setCoffeShops(parseFetchResults(data.results));
        dispatch({
          name: "SET_FECTHED_STORES",
          content: parseFetchResults(data.results),
        });
        dispatch({ name: "SET_NEAR_SHOPS_LOADED", content: true });
        setIsFindingNearShops(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ name: "SET_NEAR_SHOPS_LOADED", content: false });
        setIsFindingNearShops(false);
      });
  }

  function positionError(error) {
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
