import { useRef, useState } from "react";

function generateProductList() {
  return Array(1e4)
    .fill("Product number")
    .map((item, index) => item.concat(" " + index));
}

const Search = () => {
  const products = generateProductList();
  const [filteredProducts, setFilteredProducts] = useState(products);

  //   const debouncedSetFilteredProducts = useDebounce(setFilteredProducts)

  const timeoutRef = useRef(0).current;

  function filterProductList(value) {
    clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      console.log("started filter");
      setFilteredProducts(
        products.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 1000);
  }

  return (
    <div className="app-container">
      <SearchInput
        handleInput={(value) => filterProductList(value)}
        style={{ marginBottom: "1rem" }}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

function ProductList({ products }) {
  return (
    <div>
      <ul>
        {products.map((item) => (
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
