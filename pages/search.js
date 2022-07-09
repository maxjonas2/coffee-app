import { useState, useTransition, useDeferredValue } from "react";

function generateProductList() {
  return Array(1e2)
    .fill("Product number")
    .map((item, index) => item.concat(" " + index));
}

const Search = () => {
  const products = generateProductList();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [isPending, startTransition] = useTransition();

  function filterProductList(value) {
    startTransition(function () {
      setFilteredProducts(
        products.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  }

  return (
    <div className="app-container">
      <SearchInput
        handleInput={(value) => filterProductList(value)}
        style={{ marginBottom: "1rem" }}
      />
      {isPending && <p>Loading</p>}
      <ProductList products={filteredProducts} />
    </div>
  );
};

function ProductList({ products }) {
  const deferredProducts = useDeferredValue(products);
  return (
    <div>
      <ul>
        {deferredProducts.map((item) => (
          <li key={item} style={{ marginBottom: ".2rem" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchInput({ handleInput, ...rest }) {
  return (
    <div>
      <input
        autoFocus
        type="text"
        onChange={(e) => handleInput(e.target.value)}
        {...rest}
      />
    </div>
  );
}

export default Search;
