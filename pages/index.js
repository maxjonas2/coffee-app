import { useEffect, useState, useContext, Suspense } from "react";
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

function parseFetchResults(data) {
  return data.map((item) => ({
    id: item.fsq_id,
    name: item.name,
    address: item.location.address,
    imgUrl: "/assets/cafe_image.jpg",
  }));
}

export default function Home() {
  const [progressValue, setProgressValue] = useState(0);
  const [coffeeShops, setCoffeShops] = useState([]);

  const { dialog, setDialog } = useContext(InterfaceContext);

  useEffect(() => {
    // getData("coffeeShops").then((data) => {
    //   setListData(data);
    // });
    // This is not necessary because the data has been pre-generated on the server and passed to the component as a prop

    navigator.geolocation.getCurrentPosition(positionSuccesss, positionError);
  }, []);

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
      .then((data) => setCoffeShops(parseFetchResults(data.results)))
      .catch((error) => console.log(error));
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
        <h1>Shop Finder</h1>
        <p>Start browsing below</p>
      </div>
      <div>
        <button className="btn-normal" onClick={openDialog}>
          Open Dialog
        </button>
      </div>
      {coffeeShops.length === 0 ? (
        <>
          <List data={[1, 2, 3, 4, 5, 6]} render={item => <ShopCard placeholder={true}/>}
        </>
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
