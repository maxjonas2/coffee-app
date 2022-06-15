import Link from "next/link";
import Image from "next/image";

export default function ShopCard({ data, placeholder = false }) {
  if (placeholder === true) {
    return <div className="card shop-card card-placeholder flow">
      <div></div>
    </div>;
  }

  const { id, name, imgUrl, address } = data;

  return (
    <Link href={`/shops/${id}`}>
      <div className="card shop-card flow pop-on-hover" role={"link"}>
        <h3 className="card-title">{name}</h3>
        {/* <p className="text-faded">{neighborhood}</p> */}
        <p className="text-faded">{address}</p>
        <div className="image-container">
          <img
            src={imgUrl}
            height="220"
            alt="Image showing coffee"
            title="Image showing café"
          />
        </div>
      </div>
    </Link>
  );
}
