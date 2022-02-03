let cityFormEl = document.querySelector("#city-form");
let selectedCityEl= document.querySelector("#selected-city");
let pastSearchesEl= document.querySelector("#past-searches");
let currentWeatherEl= document.querySelector("#current-weather");
let forecastConatainerEl= document.querySelector("#forecast");
let apiKey ='ab005648c2da3a02b53d989dac1d8651';
let fiveDayforecastEl=document.querySelector("#forecast")
let apiKeyFive= '71c543f4e5fc044e2c293d5a11ea3ec8';


//get the forecast
 var getforecast = function(){
    var cityEl= selectedCityEl.value.trim()
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEl}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function(response){
        console.log(cityEl)
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
                console.log(data.main.temp)
                getFiveDayforecast(data.coord)
                // display results dynamically
                 displayforecast(data);
                 
                 
            });
            }else{
                 alert("ERROR: City Not Found");
                console.log('API call failed')
            }
        })
        .catch(function(error){
        alert("Unable to connect to weather API.");
    });
   }
  
   //get the forecast
 var getFiveDayforecast = function(coord){
    var cityEl= selectedCityEl.value.trim()
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function(response){
        console.log(cityEl)
        if(response.ok){
            response.json().then(function(dataFive){
                console.log(dataFive)
               

                // display results dynamically
                 displayFiveDayForecast(dataFive);
                 
                
            });
            }else{
                 alert("ERROR: City Not Found");
                console.log('API call failed')
            }
        })
        .catch(function(error){
        alert("Unable to connect to weather API.");
    });
   }

   

//gets value from input/location
var formSubmitHandler = function(event){
    event.preventDefault();
    var city= selectedCityEl.value.trim()
    ;
    localStorage.setItem("city",city);
    pastSearchBtn();

    if(city){
        getforecast(city);
       
        forecastConatainerEl.textContent="";
        selectedCityEl.value="";
     }
     else{
         alert("Please Enter a City");
     }
     console.log(event);
     
};

cityFormEl.addEventListener("submit", formSubmitHandler)

function displayforecast (data) {

    // iterate over the dataArr array that is passed in
    forecastConatainerEl.textContent="";
    currentWeatherEl.textContent="";
     
       // create elements for 5-day forecast and assign classes so they are styled properly
       var currentDay= document.createElement("div");
       currentDay.classList="card-day";

       var titleEL = document.createElement("h5");
        titleEL.textContent= (data.name) 
        
        var imgEl = document.createElement("p");
        imgEl.textContent = (data.weather[0].description)

        var tempEl = document.createElement("p");
        tempEl.textContent= "Temp: " + (data.main.temp)

        var windEl = document.createElement("p");
        windEl.textContent= "Wind: " +(data.wind.speed)

        var humidityEl= document.createElement("p")
        humidityEl.textContent= "Humidity: " +(data.main.humidity)

        currentDay.appendChild(titleEL);
        currentDay.appendChild(imgEl);
        currentDay.appendChild(tempEl);
        currentDay.appendChild(windEl);
        currentDay.appendChild(humidityEl);
        

        currentWeatherEl.appendChild(currentDay);
}
       
function displayFiveDayForecast(dataFive){  

    var  UvEl= JSON.parse(dataFive.daily[0].uvi);
    if(UvEl<= 3){
        var UviEL= document.createElement("btn");
        UviEL.classList="btn-success";
        UviEL.textContent= "UV Index: "+ (UvEl);
        currentWeatherEl.appendChild(UviEL);

    }else if
            (UvEl<= 7){
            var UviEL= document.createElement("btn");
            UviEL.classList="btn-warning";
            UviEL.textContent= "UV Index: "+ (UvEl);
            currentWeatherEl.appendChild(UviEL);

    }else
            {  var UviEL= document.createElement("btn");
                UviEL.classList="btn-danger";
                UviEL.textContent= "UV Index: "+ (UvEl);
                currentWeatherEl.appendChild(UviEL);
        
    }


    

    for(var i = 1; i < 6; i++) {
        //create Element li, add class to li
        var day= document.createElement("div");
        day.classList="card-body card";

        var titleEL = document.createElement("h5");
        titleEL.textContent= (moment().add(i,"days").format("L"));
        //moment(dataFive.daily[i].dt).format("L");

        var imgEl = document.createElement("img");
        imgEl.textContent = "IMG"

        var tempEl = document.createElement("p");
        tempEl.textContent= "Temp: " + (dataFive.daily[i].temp.day);

        var windEl = document.createElement("p");
        windEl.textContent= "Wind: " + (dataFive.daily[i].wind_speed)

        var humidityEl= document.createElement("p")
        humidityEl.textContent= "Humidity: " + (dataFive.daily[i].humidity)

        day.appendChild(titleEL);
        day.appendChild(imgEl);
        day.appendChild(tempEl);
        day.appendChild(windEl);
        day.appendChild(humidityEl);
        fiveDayforecastEl.appendChild(day);

    
    }
     


    }
    function pastSearchBtn(){
        var pastSearch= document.createElement("div")

        var pastCity= localStorage.getItem("city");

        var pastBtn= document.createElement("btn");
        pastBtn.classList="btn btn-info"
        pastBtn.textContent= pastCity;

        pastSearch.appendChild(pastBtn);
        pastSearchesEl.appendChild(pastSearch);

    }

    pastSearchesEl.addEventListener("click", getFiveDayforecast);
    


