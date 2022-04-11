const apiKey = 'b6c8d6cbabe24c6c8e6223207220604'
const queryString = new URLSearchParams(window.location.search)
const locations = `${queryString.get('location')} ${queryString.get('state')}`
const ul = document.querySelector("ul")
const h1 = document.querySelector("h1")

// fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`)
fetch(`assets/demoWeather.json`)
    .then(response => response.json())
    .then(weatherForecast => {
        console.log(weatherForecast)
        h1.textContent = weatherForecast.location.name
        const current = weatherForecast.current
        const day1 = weatherForecast.forecast.forecastday[0]
        const today = document.createElement("li")
        today.innerHTML = `
            <h3>Today</h3>
            <img src="${current.condition.icon}" alt="${current.condition.text}">
            <h3>Current Temperature</h3>
            <h2>${Math.round(current.temp_f)}°</h2>
            <p>${current.condition.text}</p>
            <p>High: ${Math.round(day1.day.maxtemp_f)}° | Low: ${Math.round(day1.day.mintemp_f)}°</p>
        `
        const details = document.createElement("div")
        details.classList = "details hidden"
        details.innerHTML = `
            <p>Feels Like: ${Math.round(current.feelslike_f)}°</p>
            <p>Wind: ${current.wind_mph} mph ${current.wind_dir}</p>
            <p>Humidity: ${current.humidity}%</p>
            <p>Visability: ${current.vis_miles} mi</p>
            <p>Sunrise: ${day1.astro.sunrise}</p>
            <p>Sunset: ${day1.astro.sunset}</p>
            `
        today.append(details)
        let isClicked = true
        today.addEventListener("click", event => {
            if (isClicked) {
                details.classList.remove("hidden")
                isClicked = false
            } else {
                details.classList.add("hidden")
                isClicked = true
            }
        })
        ul.append(today)
        const forecast = weatherForecast.forecast.forecastday
            .slice(1, weatherForecast.forecast.forecastday.length)
        forecast
            .map(date => {
                const dayOfWeek = new Date(`${date.date.slice(0, 4)}`, `${date.date.slice(5, 7) - 1}`, `${date.date.slice(8, 10)}`).toLocaleDateString('en-US', { weekday: 'long', })
                const day = document.createElement("li")
                day.innerHTML = `
                    <h3>${dayOfWeek}</h3>
                    <img src="${date.day.condition.icon}" alt="${date.day.condition.text}">
                    <h3>High</h3>
                    <h2>${Math.round(date.day.maxtemp_f)}°</h2>
                    <p>${date.day.condition.text}</p>
                    <p>Low: ${Math.round(date.day.mintemp_f)}°</p>
                `
                const details = document.createElement("div")
                details.classList = "details hidden"
                details.innerHTML = `
                    <p>Sunrise: ${date.astro.sunrise}</p>
                    <p>Sunset: ${date.astro.sunset}</p>
                    `
                day.append(details)
                let isClicked = true
                day.addEventListener("click", event => {
                    if (isClicked) {
                        details.classList.remove("hidden")
                        isClicked = false
                    } else {
                        details.classList.add("hidden")
                        isClicked = true
                    }
                })
                ul.append(day)
            })
    })