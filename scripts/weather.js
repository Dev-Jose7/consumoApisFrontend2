document.addEventListener("DOMContentLoaded", () => {
    let cityInput = document.getElementById("cityInput");
    let seachButton = document.getElementById("searchButton");

    seachButton.addEventListener("click", getCity)
    cityInput.addEventListener("keydown", (e) => {
        e.key == "Enter" ? getCity() : undefined
    })

    async function getCity(){
        let city = ""
        let key = "91ed3edfa1a73fb56bf1982aef564481";

        if(cityInput.value == ""){
            alert("Ingrese una ciudad por favor")
        } else {
            city = cityInput.value
            console.log(city)
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=es`;
            try {
                let data = await getData(url);
                printData(data);
            } catch (error) {
                let weatherContainer = document.getElementById("weatherResult")
                weatherContainer.innerHTML = `<h3>Ciudad no encontrada</h3>`
            }
        }    
    }

    function printData(data){
        console.log(data)
        let city = data.name;
        let temperature = data.main.temp;
        let description = data.weather[0].description;
        let icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        let weatherContainer = document.getElementById("weatherResult")

        weatherContainer.innerHTML = "";

        let elemento = `
            <h3>Clima en ${city}</h3>
            <img src="${icon}" alt="Icono del clima" />
            <p><strong>Temperatura:</strong> ${temperature}°C</p>
            <p><strong>Descripción:</strong> ${description}</p>
        `

        weatherContainer.innerHTML = elemento;
    }

    function getData(url){
        return fetch(url)
            .then(response => response.json())
            .catch(error => alert(error))
    }
})