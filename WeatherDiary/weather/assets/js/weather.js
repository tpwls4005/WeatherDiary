const API_KEY = `tdA81qDc4LAVznQDrQKG9zv0kmexr8kL`
let todayWeather = document.querySelector('.today_weather');
let weather = [];


const getWeather = async ()=>{
    const url = new URL(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/226081?apikey=${API_KEY}`);
    const weatherData = await fetch(url);
    const data = await weatherData.json();
    weather = data;
    console.log("weather 테스트", weather)
    todayRender();
};

getWeather();

const todayRender = () => {
    const todyWeatherHTML = `
        <div class="today_address"></div>
        <div class="today_cont"></div>
        <div class="today_temperature"></div>
        <ul class="today_chart_list">
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="today_style"></div>`;
    document.getElementById('news-board').innerHTML = todyWeatherHTML;
}