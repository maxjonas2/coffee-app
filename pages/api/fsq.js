import { useEffect } from "react";

export default function fsqHandler(req, res) {
  const { lat, long } = req.query;
  fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee&ll=${lat},${long}&radius=30000`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: process.env.FOURSQUARE_API_KEY,
      },
    }
  )
    .then((data) => data.json())
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(400).json({ message: error.toString() }));
}
