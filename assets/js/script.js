var getWeatherInfo = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e450fa9a4e7801cd2fc1c5ae48d0e9c"

    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc`)
            .then(function(res){
                res.json().then(function(data){
                    console.log(data)
                    createWeatherInfo(data)
                })
            })
        })
    })
}

var createWeatherInfo = function(info){
    var currentContainer = $("#current-result")
    
    var temp = $("<div>").text("Temperature: " + info.current.temp)
    currentContainer.append(temp)

    var wind = $("<div>").text("Wind Speed: " + info.current.wind_speed)
    currentContainer.append(wind)

    var humidity = $("<div>").text("Humidity: " + info.current.humidity +"%")
    currentContainer.append(humidity)

    var uvi = $("<div>").text("UVI: " + info.current.uvi)
    currentContainer.append(uvi)

    console.log(uvi)
}

getWeatherInfo("charlotte")

