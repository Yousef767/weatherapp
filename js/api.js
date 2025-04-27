const getLocation = document.getElementById("getLocation");

getLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords);
      getWeather(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.log(error);
    }
  );
});

async function getWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b2a12e61da773f976f2198048e736315`
    );
    const data = await res.json();
    const humidity = data.main.humidity;
    const temp = data.main.temp;
    const clouds = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;
    const result = [city, country, temp, clouds, humidity];
    const spans = document.querySelectorAll("#location .rr span:nth-child(2)");
    console.log(spans);
    spans.forEach((e, i) => {
      if (i === 2) {
        e.innerHTML = (result[i] - 272.15).toFixed(2);
      } else {
        e.innerHTML = result[i];
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city");
  const country = document.getElementById("country");
  searchWeather(city.value, country.value);
});

async function searchWeather(c, ct) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${c},${ct}&appid=b2a12e61da773f976f2198048e736315`
    );
    const data = await res.json();
    const humidity = data.main.humidity;
    const temp = data.main.temp;
    const clouds = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;
    const result = [city, country, temp, clouds, humidity];
    const spans = document.querySelectorAll("#searchResult .rr span:nth-child(2)");
    spans.forEach((e, i) => {
      if (i === 2) {
        e.innerHTML = (result[i] - 272.15).toFixed(2);
      } else {
        e.innerHTML = result[i];
      }
    });
  } catch (error) {
    console.log(error);
  }
}
