const API_KEY = `tdA81qDc4LAVznQDrQKG9zv0kmexr8kL`;
let weatherList = [];

const getWeather = async () => {
    try {
        const url = new URL(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/226081?apikey=${API_KEY}&language=ko-kr&details=true`);
        const weatherData = await fetch(url);
        const data = await weatherData.json();

        const temperature = data.DailyForecasts[0];
        console.log(temperature);
        const weather = data;
        weatherList = data.DailyForecasts
        console.log("weather 테스트", weather);
        todayRender(weather);
    } catch (error) {
        console.error('날씨 데이터를 받아오는데 실패했습니다.', error);
    }
};

const todayRender = (weather) => {
    const todayWeatherHTML = `
        <div class="today_address">서울특별시</div>
        <div class="today_cont"></div>
        <div class="today_temperature">${weather.temperature}</div>
        <ul class="today_chart_list">
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="today_style"></div>`;
    document.querySelector('.today_weather').innerHTML = todayWeatherHTML;
};

getWeather();
