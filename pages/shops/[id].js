import { getData } from "../../data/api";

export async function getStaticPaths() {
  return {
    paths: (await getData("coffeeShops")).map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: (await getData("coffeeShops")).find((item) => item.id == params.id),
  };
}

export default function Shop(props) {
  //   const router = useRouter();
  //   const { id } = router.query;

  console.log(props);

  return (
    <div>
      <p>{props.name}</p>
      <p>Welcome to shop number {props.id}</p>
    </div>
  );
}
