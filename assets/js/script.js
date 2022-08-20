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
    
    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + info.current.weather[0].icon +"@2x.png")
    currentContainer.append(img)
    
    var temp = $("<div>").text("Temperature: " + info.current.temp)
    currentContainer.append(temp)

    var wind = $("<div>").text("Wind Speed: " + info.current.wind_speed)
    currentContainer.append(wind)

    var humidity = $("<div>").text("Humidity: " + info.current.humidity +"%")
    currentContainer.append(humidity)

    var uvi = $("<div>").text("UVI: " + info.current.uvi)
    uvi.removeClass("bg-danger bg-warning bg-success")
    if (info.current.uvi < 3) {
        uvi.addClass("bg-success")
    } else if (info.current.uvi >= 3 && info.current.uvi <=8 ){
        uvi.addClass("bg-warning")
    } else {
        uvi.addClass("bg-danger")
    }
    currentContainer.append(uvi)
    }


getWeatherInfo("charlotte")

