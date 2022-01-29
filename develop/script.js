let cityFormEl = document.querySelector("#city-form");
let selectedCityEl= document.querySelector("#selected-city");
let pastSearchesEl= document.querySelector("#past-searches");
let currentWeatherEl= document.querySelector("#current-weather");
let forcastConatainerEl= document.querySelector("#forcast");

//get the forcast
var getforcast = function(){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}";

    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayforcast(data);
            });
            }else{
                alert("ERROR: City Not Found");
            }
        })
        .catch(function(error){
        alert("Unable to connect to weather API.");
    });
    }
// gets value from input/location
var formSubmitHandler = function(event){
    event.preventDefault();

    var city= selectedCityEl.value.trim();

    if(city){
        getforcast(city);
        forcastConatainerEl.textContent="";
        selectedCityEl.value="";
     }
     else{
         alert("Please Enter a City");
     }
     console.log(event);
};


cityFormEl.addEventListener("submit", formSubmitHandler)
