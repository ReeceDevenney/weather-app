citySearch = []

var getWeatherInfo = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e450fa9a4e7801cd2fc1c5ae48d0e9c"

    fetch(apiURL).then(function (response) {
        response.json().then(function (data) {
            if (response.ok) {
                if(citySearch.includes(data.name) === false) {
                    pastSearchBtn(data.name)
                    citySearch.push(data.name)
                }

                localStorage.setItem("citySearch", JSON.stringify(citySearch))
                console.log(citySearch)
                console.log(data)
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc`)
                    .then(function (res) {
                        res.json().then(function (data) {
                            console.log(data)
                            createWeatherInfo(data, city)
                            createFiveDay(data)
                            
                        })
                    })
            }

        })
    })
}

var createWeatherInfo = function (info, city) {
    var currentContainer = $("#current-result")

    currentContainer.children().remove()

    var date = $("<h2>").text(moment().format("L"))
    currentContainer.append(date)

    var cityName = $("<h3>").text(city.toUpperCase())
    currentContainer.append(cityName)

    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + info.current.weather[0].icon + "@2x.png")
    currentContainer.append(img)

    var temp = $("<div>").text("Temperature: " + info.current.temp)
    currentContainer.append(temp)

    var wind = $("<div>").text("Wind Speed: " + info.current.wind_speed)
    currentContainer.append(wind)

    var humidity = $("<div>").text("Humidity: " + info.current.humidity + "%")
    currentContainer.append(humidity)

    var uvi = $("<a>").text("UVI: " + info.current.uvi)
    uvi.attr("href", "https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index#:~:text=What%20is%20the%20UV%20index,takes%20for%20harm%20to%20occur.")
    uvi.attr("target", "_blank")
    uvi.addClass("btn")
    uvi.removeClass("bg-danger bg-warning bg-success")
    if (info.current.uvi < 3) {
        uvi.addClass("bg-success")
    } else if (info.current.uvi >= 3 && info.current.uvi <= 8) {
        uvi.addClass("bg-warning")
    } else {
        uvi.addClass("bg-danger")
    }
    currentContainer.append(uvi)
}

var createFiveDay = function (info) {
    var fiveDayContainer = $("#five-day")
    fiveDayContainer.children().remove()

    for (var i = 1; i <= 5; i++) {
        var oneDayContainer = $("<div>")
        oneDayContainer.addClass("col-2 mx-2 bg-info rounded justify-content-center text-center")

        var date = $("<h6>").text(moment().add(i + 1, "days").format("L"))
        date.addClass("justify-content-center")
        oneDayContainer.append(date)

        var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + info.daily[i].weather[0].icon + "@2x.png")
        oneDayContainer.append(img)

        var dayTemp = $("<div>").text("Temp: " + info.daily[i].temp.day)
        oneDayContainer.append(dayTemp)

        var windSpeed = $("<div>").text("Wind: " + info.daily[i].wind_speed)
        oneDayContainer.append(windSpeed)

        var humidity = $("<div>").text("Humidity: " + info.daily[i].humidity)
        oneDayContainer.append(humidity)

        fiveDayContainer.append(oneDayContainer)
    }

}

$("#city-search").on("submit", function (event) {
    event.preventDefault();

    var cityName = $("#city-input").val().trim()
    getWeatherInfo(cityName)

    $("#city-input").val("")
})

var pastSearchBtn = function (cityName) {
    var pastSearchContainer = $("#past-seraches")
    var pastSearch = $("<button>").text(cityName).addClass("btn-secondary rounded text-dark text-center my-1 w-100 prev-search")
    pastSearchContainer.append(pastSearch)
}

$("#past-seraches").on("click", ".prev-search", function (event) {
    event.preventDefault();

    var cityName = $($(this)).text().trim()
    getWeatherInfo(cityName)
})

var loadSave = function() {
    var city = JSON.parse(localStorage.getItem("citySearch"))
    if (city){
        citySearch = JSON.parse(localStorage.getItem("citySearch"))
        for (var i = 0; i < city.length; i++) {
            pastSearchBtn(city[i])
        }
    }  
}

loadSave()
