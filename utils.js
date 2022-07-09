/**
 * Returns a Response object from a request to the FourSquare API (place search by ID)
 * @param {string} id The FS place ID
 * @returns {Promise<Response>} A Response object upon which .json() .blob() etc. can be called
 */
export function fetchCoffeeShop(id) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  return fetch(
    "https://api.foursquare.com/v3/places/" + id.toString(),
    options
  );
}

export function parseFetchResults(data) {
  return data.map((item) => ({
    id: item.fsq_id,
    name: item.name,
    address: item.location.address,
    imgUrl: "/assets/cafe_image.jpg",
  }));
}

export function fetchCoffeeShops(coords, options) {
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
    .then((data) => {
      // setCoffeShops(parseFetchResults(data.results));
      options.dispatcher({
        name: "SET_FECTHED_STORES",
        content: parseFetchResults(data.results),
      });
      options.dispatcher({ name: "SET_NEAR_SHOPS_LOADED", content: true });
    })
    .catch((error) => {
      console.log(error);
      options.dispatcher({ name: "SET_NEAR_SHOPS_LOADED", content: false });
    })
    .finally(() => {
      options.dispatcher({ name: "SET_IS_FINDING_NEAR_SHOPS", content: false });
    });
}
