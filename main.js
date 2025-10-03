// Using NASA API from https://data.nasa.gov/ => search 'NASA Facilities API'
// https://data.nasa.gov/dataset/nasa-facilities-api/resource/8da12948-3793-4ec1-b5c6-f95e86fd6021

// NASA may have updated endpoint, now blocked by CORS. Searched for how to bypass CORS without adding a backend/server and found this post: https://www.descope.com/blog/post/cors-errors => then googled cors proxies and found this: https://cors.lol/

const nasaURL = `https://api.cors.lol/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;
const WEATHER_API_KEY = ""; // ADD KEY

fetch(nasaURL)
  .then((res) => res.json())
  .then((data) => {
    // const test = [
    //   {
    //     center: "Kennedy Space Center",
    //     center_search_status: "Public",
    //     facility: "Control Room 2/1726/HGR-S ",
    //     occupied: "1957-01-01T00:00:00.000",
    //     record_date: "1996-03-01T00:00:00.000",
    //     last_update: "2015-06-22T00:00:00.000",
    //     country: "US",
    //     contact: "Sheryl Chaffee",
    //     phone: "321-867-8047",
    //     location: {
    //       latitude: "28.538331",
    //       longitude: "-81.378879",
    //       human_address: '{"address": "", "city": "", "state": "", "zip": "32899"}',
    //     },
    //     city: "Kennedy Space Center",
    //     state: "FL",
    //     zipcode: "32899",
    //     ":@computed_region_bigw_e76g": "173",
    //     ":@computed_region_cbhk_fwbd": "30",
    //     ":@computed_region_nnqa_25f4": "1078",
    //   },
    //   {
    //     center: "Langley Research Center",
    //     center_search_status: "Public",
    //     facility: "Micometeroid/LDEF Analysis Laboratory",
    //     occupied: "1965-01-01T00:00:00.000",
    //     status: "Active",
    //     record_date: "1996-03-01T00:00:00.000",
    //     last_update: "2013-02-25T00:00:00.000",
    //     country: "US",
    //     contact: "Sherry Johnson",
    //     phone: "757.864-3848",
    //     location: {
    //       latitude: "37.08681",
    //       longitude: "-76.376649",
    //       human_address:
    //         '{"address": "", "city": "", "state": "", "zip": "23681-2199"}',
    //     },
    //     city: "Hampton",
    //     state: "VA",
    //     zipcode: "23681-2199",
    //     ":@computed_region_bigw_e76g": "173",
    //     ":@computed_region_cbhk_fwbd": "40",
    //     ":@computed_region_nnqa_25f4": "2913",
    //   },
    // ];
    data.forEach((place) => {
      // get name + location
      const { facility, center, city, state, country, zipcode } = place;
      const zip = zipcode.split("-")[0];

      // get weather
      const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${zip}`;
      fetch(weatherURL)
        .then((res) => res.json())
        .then((data) => {
          const { condition, temp_f, temp_c } = data.current;

          // add name, location, weather to DOM
          const section = document.createElement("section");
          section.innerHTML = `
            <img src=${"https:" + condition.icon} alt=""/>
            <p>${temp_f} F / ${temp_c} C</p>
            <p>${facility}</p>
            <p>${center}</p>
            <p><span>${city}, ${state}, ${zip} ${country}</span></p>
          `;

          document.getElementById("container").appendChild(section);
        });
    });
  })
  .catch((err) => console.error(err));
