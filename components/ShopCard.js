import Link from "next/link";

export default function ShopCard({ data }) {
  const { id, name, imgUrl, websiteUrl, address, neighborhood } = data;

  return (
    <Link href={`/shops/${id}`}>
      <div className="card flow pop-on-hover" role={"link"}>
        <h3>{name}</h3>
        <p className="text-faded">{neighborhood}</p>
        <p className="text-faded">{address}</p>
        <img src={imgUrl} height="220" alt="Image showing coffee" />
      </div>
    </Link>
  );
}
