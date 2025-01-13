document.addEventListener('DOMContentLoaded', function() {
  const input=document.getElementById("input");
  const weather_btn=document.getElementById("weather_btn");
  const weather_info=document.getElementById("weather_info");
  const city_name=document.getElementById("city_name");
  const temprature=document.getElementById("temprature");
  const description=document.getElementById("description");
  const error=document.getElementById("error");

  const API_KEY="55d6851dea19c333fb16fda5ba258be2";

  weather_btn.addEventListener("click", async function() {
    const city=input.value.trim();
    if(city===""){
      alert("city cannot be empty");
      return;
    }

    try{
      const data=await fetchWeatherData(city);
      displayWeatherData(data);
    }catch(error){
      showError();
    }
  });

  async function fetchWeatherData(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response=await fetch(url);

    if(!response.ok){
      throw new Error("City not found");
    }

    return response.json();
  }

  function displayWeatherData(data){
    const {name, main, weather}=data;

    city_name.textContent=name;
    temprature.textContent=`Temprature: ${main.temp}°C`;
    description.textContent=`Weather: ${weather[0].description}`;

    weather_info.classList.remove("hidden");
    error.classList.add("hidden");
  }

  function showError(){
    weather_info.classList.add("hidden");
    error.classList.remove("hidden");
  }
});