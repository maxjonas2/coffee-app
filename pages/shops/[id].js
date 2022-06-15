import { getData } from "../../data/api";
import { useRouter } from "next/router";

function fetchCoffeeShops() {
  return getData("coffeeShops").then((data) => data.json());
}

async function fetchCoffeeShop(id) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/" + id.toString(),
    options
  );

  return response;
}

/* getStaticPaths Function Schame
 * return {paths: [{params: {...params}}], fallback: true | false}
 * params: {id: 1, name: 'whatever', etc}
 */

export async function getStaticPaths() {
  return {
    paths: (await fetchCoffeeShops()).map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: true,
  };
}

// export async function getStaticProps({ params }) {
//   return {
//     props: (await fetchCoffeeShops()).find((item) => item.id == params.id),
//   };
// }

export async function getStaticProps({ params }) {
  const response = await fetchCoffeeShop(params.id);
  if (Number(response.status) === 200) {
    const props = await response.json();
    return { props: { status: 200, ...props } };
  } else {
    return { props: { status: 400 } };
  }
}

export default function Shop(props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }
  console.log(props);
  if (props.status == 400) {
    return <div>Does not exist! 404</div>;
  } else {
    return (
      <main className="flow-large">
        <header className="centered-text">
          <h2 className="text-spaced upper">{props.name}</h2>
          <p>{props.location.address}</p>
        </header>
        <section className="centered-items">
          <article className="card cafe-page-article">
            <div className="container-picture">
              <picture>
                <img
                  width="350"
                  src="/assets/cafe_image.jpg"
                  className="card-rounded"
                />
              </picture>
            </div>
            <div className="flow-small">
              <p>
                <strong>Welcome to {props.name}</strong>
              </p>
              <p>Find us at {props.location.address}</p>
              <p>{props.location.postcode}</p>
            </div>
          </article>
        </section>
      </main>
    );
  }

  // if (!props) {
  //   console.log("no props!");
  //   setCurrentShop({ id: 1, name: "teste", address: "whatever" });
  // } else {
  //   setCurrentShop(props);
  // }
}
