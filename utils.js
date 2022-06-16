/**
 * Returns a Response object from a request to the FourSquare API (place search by ID)
 * @param {string} id The FS place ID
 * @returns {Response} A Response object upon which .json() .blob() etc. can be called
 */
export async function fetchCoffeeShop(id) {
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

  