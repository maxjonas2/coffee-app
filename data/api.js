const urlMap = { coffeeShops: "http://localhost:8000/api/shops" };

export function getData(url) {
  return new Promise((resolve) => {
    fetch(urlMap[url], { cache: "default" }).then((data) => {
      resolve(data);
    });
  });
}
