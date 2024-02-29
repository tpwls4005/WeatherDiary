const API_KEY = `tdA81qDc4LAVznQDrQKG9zv0kmexr8kL`;
let weatherList = [];

const getWeather = async () => {
    try {
        const url = new URL(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/226081?apikey=${API_KEY}&language=ko-kr&details=true`);
        const weatherData = await fetch(url);
        const data = await weatherData.json();

        weatherList = data.DailyForecasts
        console.log(weatherList);
        todayRender();
    } catch (error) {
        console.error('날씨 데이터를 받아오는데 실패했습니다.', error);
    }
};

const todayRender = () => {
    const weatherDiv = document.querySelector('.today_weather'); // HTML에서 날씨 정보를 보여줄 요소를 선택
    weatherDiv.innerHTML = ''; // 이전의 날씨 정보를 초기화

    const forecast = weatherList[0]; // 첫 번째 날씨 예보 정보 가져오기
    const minTemperature = Math.floor(forecast.Temperature.Minimum.Value / 10); // 최저 온도에 Math.floor() 함수 적용
    const maxTemperature = Math.floor(forecast.Temperature.Maximum.Value / 10); // 최고 온도에 Math.floor() 함수 적용

    const forecastDetails = `<div class="today_address">서울특별시</div> 
            <div class="today_cont">${forecast.Day.IconPhrase}</div>       
            <div class="today_temperature">${forecast.Day.Icon}</div>
            <div class="today_addTemperature"><span class="min">${minTemperature}°</span> / <span class="max">${maxTemperature}°</span></div>
                <ul>
                    <li>습도 : ${forecast.Day.WetBulbTemperature.Average.Value}</li>
                    <li>바람 : ${forecast.Day.Wind.Speed.Value}  ${forecast.Day.Wind.Direction.Localized}</li>
                    <li>자외선 : ${forecast.AirAndPollen[5].Value} </li>
                </ul>
            <div class="today_style"></div>

    `;
    weatherDiv.innerHTML = forecastDetails; // 가져온 날씨 정보를 HTML 요소에 넣기
};



getWeather();
