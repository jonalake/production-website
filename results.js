const api = "b6c8d6cbabe24c6c8e6223207220604"
const queryString = new URLSearchParams(window.location.search)
const loc = `${queryString.get("location")} ${queryString.get("state")}`
const ul = document.querySelector("ul")
const h1 = document.querySelector("h1")
const h4 = document.querySelector("h4")
const button = document.querySelector("button")

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${loc}&days=3`)
    .then(response => response.json())
    .then(weatherForecast => {
        console.log(weatherForecast)
        setLocation(weatherForecast)
        ul.append(addCurrentDay(weatherForecast))
        const forecast = weatherForecast.forecast.forecastday
            .slice(1, weatherForecast.forecast.forecastday.length)
        forecast
            .map(date => {
                return ul.append(addForcastDay(date))
            })
    })
    .catch(error => {
        h1.textContent = "No matching location found."
        button.textContent = "Try Again"
        console.error(error)
    })

button.addEventListener("click", handleSubmit)

function setLocation(forecast) {
    const location = forecast.location
    h1.textContent = location.name
    h4.textContent = `
        Displaying data for ${location.name}, ${location.region}, 
        ${location.country}, as of ${location.localtime}
        `
}

function getDayofWeek(date) {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7) - 1
    const day = date.slice(8, 10)
    return new Date(`${year}`, `${month}`, `${day}`)
        .toLocaleDateString("en-US", { weekday: "long" })
}

function addCurrentDay(weatherForecast) {
    const current = weatherForecast.current
    const day = weatherForecast.forecast.forecastday[0]
    const today = document.createElement("li")
    today.innerHTML = `
        <h2>Today</h2>
        <img 
            src="${current.condition.icon}" 
            alt="${current.condition.text}"
        >
        <h2>Current Temperature</h2>
        <h3>${Math.round(current.temp_f)}°</h3>
        <p>${current.condition.text}</p>
        <p>High: ${Math.round(day.day.maxtemp_f)}° | 
        Low: ${Math.round(day.day.mintemp_f)}°</p>
    `
    const details = document.createElement("div")
    details.classList = "details hidden"
    details.innerHTML = `
        <p>Feels Like: ${Math.round(current.feelslike_f)}°</p>
        <p>Wind: ${current.wind_mph} mph ${current.wind_dir}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Visability: ${current.vis_miles} mi</p>
        <p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
        <p>Chance of Snow: ${day.day.daily_chance_of_snow}%</p>
        <p>Total Precipitation: ${day.day.totalprecip_in} in</p>
        <p>Sunrise: ${day.astro.sunrise}</p>
        <p>Sunset: ${day.astro.sunset}</p>
    `
    today.append(details)
    showDetails(today, details)
    return today
}

function addForcastDay(date) {
    const dayOfWeek = getDayofWeek(date.date)
    const day = document.createElement("li")
    day.innerHTML = `
        <h2>${dayOfWeek}</h2>
        <img 
            src="${date.day.condition.icon}" 
            alt="${date.day.condition.text}"
        >
        <h2>High</h2>
        <h3>${Math.round(date.day.maxtemp_f)}°</h3>
        <p>${date.day.condition.text}</p>
        <p>Low: ${Math.round(date.day.mintemp_f)}°</p>
    `
    const details = document.createElement("div")
    details.classList = "details hidden"
    details.innerHTML = `
        <p>Average Humidity: ${date.day.avghumidity}%</p>
        <p>Average Visability: ${date.day.avgvis_miles} mi</p>
        <p>Chance of Rain: ${date.day.daily_chance_of_rain}%</p>
        <p>Chance of Snow: ${date.day.daily_chance_of_snow}%</p>
        <p>Total Precipitation: ${date.day.totalprecip_in} in</p>
        <p>Sunrise: ${date.astro.sunrise}</p>
        <p>Sunset: ${date.astro.sunset}</p>
    `
    day.append(details)
    showDetails(day, details)
    return day
}

function handleSubmit() {
    window.location.href = "index.html"
}

function showDetails(day, details) {
    let isClicked = true
    day.addEventListener("click", () => {
        if (isClicked) {
            details.classList.remove("hidden")
            isClicked = false
        } else {
            details.classList.add("hidden")
            isClicked = true
        }
    })
    return day
}