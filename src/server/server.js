const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//body-parser as the middle ware to the express to handle HTTP POST
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder , this line allows talking between server and client side
app.use(express.static('dist'));

//debug 
var debug = require('debug');

// Setup Server
const port = 8000;
const server = app.listen(port , ()=>{console.log(`the server running on localhost: ${port}`);}); //the callback function


var projectData = [];
<<<<<<< HEAD
var geoData =[];
var imageData=[];
var forecastData=[];


=======
>>>>>>> 40d2698c402768d1ceb02b9a2c0d258a6c9ac0cc

app.get('/all', sendData);

function sendData (request, response) {
	projectData=[]; // projectData should be only containing latest values available and size should be 3 only
	if (imageData!=null) projectData.push(imageData);
	if (geoData!=null) projectData.push(geoData);
	if (forecastData!=null) projectData.push(forecastData);
	
  response.send(projectData);
  console.log("sendData:"+JSON.stringify(projectData));
};


//POST function
app.post('/postGeoData' ,postGeoData);
function postGeoData (req,res) {
	// body...
	console.log("postGeoData lat"+req.body.cityLat);
	newEntry = {
<<<<<<< HEAD
		"latitude": req.body.cityLat,
		"longitude": req.body.cityLong,
		"country": req.body.dataCountry
=======
		"latitude": req.body.lat,
		"longitude": req.body.lng,
		"country": req.body.country
>>>>>>> 40d2698c402768d1ceb02b9a2c0d258a6c9ac0cc
	}
	
	geoData.push(newEntry)
	res.send(geoData)
	console.log("postGeoData geoData:: "+JSON.stringify(geoData));
}

/* Empty JS object to act as endpoint for all routes */

app.post('/addPhoto', addPhoto);
function addPhoto (req, res) {
	console.log("received log"+req.body);
<<<<<<< HEAD
	urlEntry = {
		"photoUrl": req.body.photoUrl
		}
	imageData.push(urlEntry);//1
	res.send(imageData);
}


app.post('/sendForecast',sendForecast)
function sendForecast(req, res)
{

	console.log("sendForecast log"+JSON.stringify(req.body.weatherData));
	weatherInfo = {
		"weatherData": req.body.weatherData
		}
		forecastData.push(weatherInfo);//0
	//make a Call to Weather API here for current Forecast or Predicted forecast
	//Loop through Json to find temperatur and any any other parameter
	//populate res object and send it back to app.js
	res.send(forecastData);

}


=======
	projectData.photoUrl= req.body.photoUrl;
}
>>>>>>> 40d2698c402768d1ceb02b9a2c0d258a6c9ac0cc


