const unsplashKey = "F2e6xBoDS12Qi7Jwga3h-YKuKl-slu3nQKfwYR5MtmA";
const weatherKey = "509ab383233461c8ce6d43c495fdd435";

// Handle search button click
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  if (query) {
    getPhotos(query);
    getWeather(query);
  }
});

// Fetch photos from Unsplash
async function getPhotos(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${unsplashKey}&per_page=1`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Unsplash API URL:", url);
    console.log("Unsplash Response:", data);

    let photosDiv = document.getElementById("photos");
    photosDiv.innerHTML = "";
    
    if (data.results.length > 0) {
      data.results.forEach(photo => {
        let img = document.createElement("img");
        img.classList.add("photo-item");
        img.src = photo.urls.small;
        photosDiv.appendChild(img);
      });
    } else {
      photosDiv.innerHTML = `<p>❌ No photos found</p>`;
    }
  } catch (err) {
    console.error("Unsplash Error:", err);
  }
}

// Fetch weather from OpenWeatherMap
async function getWeather(query) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${weatherKey}&units=metric`;
  console.log("Sakshi"); // test log
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Weather API URL:", url);
    console.log("Weather API Response:", data);

    let weatherDiv = document.getElementById("weather");
     
    if (data.cod === 200) {
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
    } else {
      weatherDiv.innerHTML = `<p>❌ Location not found</p>`;
    }
  } catch (err) {
    console.error("Weather Fetch Error:", err);
    document.getElementById("weather").innerHTML = `<p>⚠️ Error fetching weather</p>`;
  }
}

// 👉 Default city when page loads
window.onload = () => {
  getPhotos("Paris");
  getWeather("Paris");
};
