import { getData } from "../../data/api";
import { useRouter } from "next/router";

function fetchCoffeeShops() {
  return getData("coffeeShops").then((data) => data.json());
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
  const props = await fetch("http://localhost:8000/api/shops/" + params.id, {
    method: "get",
  }).then((response) => response.json());
  return { props };
}

export default function Shop(props) {
  //   const router = useRouter();
  //   const { id } = router.query;

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <p>{props.name}</p>
      <p>Welcome to shop number {props.id}</p>
    </div>
  );
}
