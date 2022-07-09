export default  function coffeeShops(req, res){
    const {lat,long} = req.query;
    if(!lat || !long){
        // Handle 
    }
    fetch(
        `https://api.foursquare.com/v3/places/search?query=coffee&ll=${lat},${long}&radius=30000`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "fsq3BSwgkrfBE9GJ+5DS0TmmTIKquB0TYjPYPlVIo/u9/yk=",
          },
        }
      )
}