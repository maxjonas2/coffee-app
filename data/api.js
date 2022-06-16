import shops from "./coffee-stores";

const urlMap = { coffeeShops: "http://localhost:8000/api/shops" };

export function getData(url) {
  return new Promise((resolve) => {
    fetch(urlMap[url], { method: "get", cache: "default" }).then((response) => {
      resolve(response);
    });
  });
}

export function getCachedData(url) {
  return shops;
}
