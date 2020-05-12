/* Global Variables for GeoNames*/
const baseURL = `http://api.geonames.org/searchJSON?q=`;
const apiKey = "&username=supnav";
var apiData = "";
var apiData2 = "";
/* Global Variables for Pixabay*/
let apiData1 = "";
let pixabayEP = "https://pixabay.com/api/?key=";
let key = "16358191-fd4c471105557c199f122e3ba";
let weatherFetchError = "";
/* Global Variables for Weatherbit*/

let baseURLweather = "https://api.weatherbit.io/v2.0/current?";
const apiKeyWeather = "a1d5b4fae1e3452384b0a66a9a3dcfe5";
let forecastURLweather = "https://api.weatherbit.io/v2.0/forecast/daily?key=";
var elapsedDays = 0.0;
var tempEntry = [];
/* Global Variable to store Form Values*/

function performAction(e) {
  e.preventDefault();
  var cityData = [];
  var weatherbitData = [];
  var photoUrlData = [];
  let userCity = "";

  userCity = document.getElementById("city").value;
  //This is getting the value from the input box for the start date
  let depDate = new Date(document.getElementById("Departure").value);
  let currDate = new Date();
  //This is getting the value from the input box for the end date
  const arrDate = new Date(document.getElementById("Returning").value);

  //console.log(arrDate + "Returning date");

  let upcomingtrvlduration = calculateDuration(currDate, depDate);
  let duration = calculateDuration(depDate, arrDate);
  

  getCity(baseURL, userCity, apiKey).then(function (data) {
    console.log("hello::" + JSON.stringify(data));
    apiData = {
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      cityName: data.geonames[0].name,
    };
    console.log(
      "apiData is" + apiData.latitude + apiData.longitude + apiData.country
    );
    cityData = postCity("http://localhost:8000/postGeoData", {
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      country: data.geonames[0].countryName,
    });

    if (upcomingtrvlduration <= 16) {
      console.log("In 15 days duration");
      getForecastedWeather(
        forecastURLweather,
        apiData.latitude,
        apiData.longitude,
        apiKeyWeather,
        upcomingtrvlduration
      ).then(function (weatherData) {
        //obj = JSON.parse(weatherData);
        console.log("weather data is" + weatherData.data.length);

        console.log("weather data is" + JSON.stringify(weatherData));

        console.log("wlengtn value" + "" + weatherData.data[0].low_temp);
        tempEntry = {
          lowtemp: weatherData.data[0].low_temp,
          hightemp: weatherData.data[0].high_temp,
        };

        //postWeather('http://localhost:8000/sendForecast',{"lon":weatherData.lon,"lat":weatherData.lat});
        weatherbitData = postWeather(
          "http://localhost:8000/sendForecast",
          weatherData
        );
      });
    } else {
      weatherFetchError = "Sorry Forecasted weather unavailable";
    }
  });

  getPhoto(pixabayEP, key, userCity).then(function (photoData) {
    apiData1 = { photoUrl: photoData.hits[0].largeImageURL };
    console.log(apiData1);
    photoUrlData = postPhotoData("http://localhost:8000/addPhoto", {
      photoUrl: photoData.hits[0].largeImageURL,
    });
    updateUI();
  });
}

function calculateDuration(startDate, endDate) {
  // To calculate the time difference of vacation date start and vacation date end
  elapsedDays = endDate - startDate;
  console.log("calculateDuration->elapsedDays" + elapsedDays);
  elapsedDays = elapsedDays / (1000 * 3600 * 24);
  // To calculate the no. of days between two dates
  console.log("elapsedDays=" + elapsedDays);
  return elapsedDays;
}

const getCity = async (baseURL, city, key) => {
  const res = await fetch(baseURL + city + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
const postCity = async (url = "", geodata = {}) => {
  console.log(JSON.stringify(geodata));

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cityLat: geodata.latitude,
      cityLong: geodata.longitude,
      dataCountry: geodata.country,
    }),
  });
  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getPhoto = async (pixabayEP, key, city) => {
  const res = await fetch(pixabayEP + key + "&q=" + city);
  try {
    const photoData = await res.json();
    console.log("Modified pixabay API Call" + photoData);
    return photoData;
  } catch (error) {
    console.log("error", error);
  }
};

const postPhotoData = async (url = "", photoData = {}) => {
  console.log("PhotoData" + JSON.stringify(photoData));
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(photoData),
  });
  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getCurrentWeather = async (
  baseURLweather,
  latitude,
  longitude,
  apiKeyWeather
) => {
  console.log(
    "WeatherbitAPIURL=" +
      baseURLweather +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&key=" +
      apiKeyWeather
  );
  const res = await fetch(
    baseURLweather +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&key=" +
      apiKeyWeather
  );
  try {
    const weatherData = await res.json();
    console.log("Modified weather API Call" + JSON.stringify(weatherData));
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

const getForecastedWeather = async (
  urlWeather,
  latitude,
  longitude,
  apiKeyWeather,
  days
) => {
  //https://api.weatherbit.io/v2.0/forecast/daily?key=“a1d5b4fae1e3452384b0a66a9a3dcfe5”&days=2&lat=34.20732&lon=-84.14019
  console.log(
    "getForecastedWeather" +
      urlWeather +
      apiKeyWeather +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&days=" +
      days
  );
  const res = await fetch(
    urlWeather +
      apiKeyWeather +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&days=" +
      days
  );
  try {
    const weatherData = await res.json();
    console.log("Modified weather API Call" + JSON.stringify(weatherData));
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

const postWeather = async (url = "", weatherData = {}) => {
  console.log("weatherData" + JSON.stringify(weatherData));
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weatherData: weatherData }),
  });
  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:8000/all");
  try {
    const allData = await request.json();

    console.log("allData Length" + allData.length);
    console.log("allData=" + JSON.stringify(allData));

    //apiData2=apiData;
    console.log("apiData photoUrl" + apiData1.photoUrl);
    document.getElementById("datediff").innerHTML =
      "Trip upcoming in" + " " + elapsedDays + " Days";
    document.getElementById("latitude").innerHTML =
      "Latitude:" + " " + apiData.latitude;
    document.getElementById("longitude").innerHTML =
      "Longitude:" + " " + apiData.longitude;
    document.getElementById("country").innerHTML =
      "Travelling Destination:" + " " + apiData.cityName;
    document.getElementById("city_picture").innerHTML =
      '<img class="imgClass  width=50%" src="' + apiData1.photoUrl + '" />';
    // make changes in document object to show weather data.
    document.getElementById("app").style.display = "flex";
    document.getElementById("button").scrollIntoView({ behavior: "smooth" });
    document.getElementById("lowTemp").innerHTML =
      "Low Temp:" + " " + tempEntry.lowtemp;
    document.getElementById("hightemp").innerHTML =
      "High Temp:" + " " + tempEntry.hightemp;
    //console.log("updateUI->elapsedDays="+elapsedDays);
  } catch (error) {
    console.log("error", error);
  }
};

export { performAction };
export { calculateDuration };
