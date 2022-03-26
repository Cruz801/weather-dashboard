// 4fcd8b1fe7db2deebbe0c2f224b0d864
// moment(new Date(1648324800*1000)).format('dddd, MMMM Do YYYY')
// var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

$(document).ready(function () {
    var baseUrl = 'https://api.openweathermap.org/data/2.5'
    function getWeather(city) {
        fetch(`${baseUrl}/weather?q=${city}&appid=4fcd8b1fe7db2deebbe0c2f224b0d864`)
            .then(response => response.json())
            .then(data => {
                var lat = data.coord.lat
                var lon = data.coord.lon
                getOneCall(lat, lon, city)
            })
    }

    function getOneCall(lat, lon, city) {
        fetch(`${baseUrl}/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=4fcd8b1fe7db2deebbe0c2f224b0d864`)
            .then(response => response.json())
            .then(data => {
                displayCurrent(data.current,city)
                forecast(data.daily)
            })
    }

    function displayCurrent(weather,city) {
        var iconurl = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
        console.log('current', weather)
        $('.cityName').text(city)
        $('.currentDate').text(moment().format('dddd, MMMM Do YYYY'))
        $('.weatherIcon').attr('src',iconurl)
    }

    function forecast(weather) {
        $('.cards').empty();
        console.log('forecast', weather)
        for (var i = 1; i < 6; i++) {
            var day = weather[i]
            $('.cards').append(`<div class="card">
            <div class="card-body">
                <h3 class="card-title">${moment(new Date(day.dt*1000)).format('dddd')}</h3>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png">
                <p class="card.text">Temp: ${day.temp.max}</p>
                <p class="card.text">Wind: ${day.wind_speed}</p>
                <p class="card.text">Humidity: ${day.humidity}</p>
            </div>
        </div>`)
        }
    }

function citySearch() {
    var cityName= $('.searchInput').val()
    if (cityName){
        getWeather(cityName)
    } else {
        alert('Please enter a city');
    }
    // save city to localstorage new function

}

function getCityFromStorage() {

}

    
$('.searchBtn').click(citySearch);
getWeather('Salt Lake City')
});
