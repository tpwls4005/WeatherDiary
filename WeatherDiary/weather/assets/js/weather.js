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

const getWeekWeather = async () => {
    try {
        const url = new URL(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/226081?apikey=${API_KEY}&language=ko-kr&details=true`);
        const weekWeatherData = await fetch(url);
        const data = await weekWeatherData.json();
        weatherList = data.DailyForecasts

        console.log(weatherList);
        weekendRender();
    } catch (error) {
        console.error('주간 날씨 데이터를 받아오는데 실패했습니다.', error);
    }
};



const todayRender = () => {
    const todayWeather = document.querySelector('.today_weather'); // HTML에서 날씨 정보를 보여줄 요소를 선택
    todayWeather.innerHTML = ''; // 이전의 날씨 정보를 초기화

    const forecast = weatherList[0]; // 첫 번째 날씨 예보 정보 가져오기
    const minTemperature = Math.floor(forecast.Temperature.Minimum.Value / 10); // 최저 온도에 Math.floor() 함수 적용
    const maxTemperature = Math.floor(forecast.Temperature.Maximum.Value / 10); // 최고 온도에 Math.floor() 함수 적용

    const forecastDetails = `<div class="today_address">서울특별시</div> 
            <div class="today_cont">${forecast.Day.IconPhrase}</div>       
            <div class="today_temperature">${forecast.Day.Icon}</div>
            <div class="today_addTemperature"><span class="min">${minTemperature}°</span> / <span class="max">${maxTemperature}°</span></div>
                <ul class="d-flex justify-content-center align-items-center">
                    <li>습도 : ${forecast.Day.WetBulbTemperature.Average.Value}</li>
                    <li>바람 : ${forecast.Day.Wind.Speed.Value}  ${forecast.Day.Wind.Direction.Localized}</li>
                    <li>자외선 : ${forecast.AirAndPollen[5].Value} </li>
                </ul>
            <div class="today_style"></div>

    `;
    todayWeather.innerHTML = forecastDetails; // 가져온 날씨 정보를 HTML 요소에 넣기
};

const weekendRender = () => {
    const weekWeather = document.querySelector('.week_list'); // HTML에서 날씨 정보를 보여줄 요소를 선택
    
    weekWeather.innerHTML = ''; // 이전의 날씨 정보를 초기화
    const forecasts = weatherList;

    // 요일을 가져오기 위한 배열
    let days = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // 시간, 분, 초, 밀리초를 0으로 설정하여 날짜만 비교할 수 있게 함

    const weekForecastDetail = forecasts.map((forecast, index) => {
        const date = new Date(forecast.Date);  // forecast의 Date 속성을 이용하여 Date 객체 생성
        date.setHours(0, 0, 0, 0);

        const day = days[date.getDay()];  // getDay()는 0(일요일) ~ 6(토요일) 값을 반환
        const dateString = date.getTime() === today.getTime() ? '오늘' : (date.getMonth()+1) + '월 ' + date.getDate() + '일';  // 월과 일을 문자열로 만듦

        const minTemperature = Math.floor(forecast.Temperature.Minimum.Value / 10); // 최저 온도에 Math.floor() 함수 적용
        const maxTemperature = Math.floor(forecast.Temperature.Maximum.Value / 10); // 최고 온도에 Math.floor() 함수 적용

        return `
            <li class="week_item col-lg-6 d-flex justify-content-between align-items-center">
                <div class="cell_date d-flex flex-column align-items-center">
                     ${day}<span>${dateString}</span>
                </div>
                <div class="cell_icon"></div>
                <div class="cell_icon"></div>
                <div class="cell_temperature_lowest min">${minTemperature}°</div>
                <div class="cell_temperature_highest max">${maxTemperature}°</div>
            </li>
        `;
    }).join('');

    weekWeather.innerHTML = weekForecastDetail; // 가져온 날씨 정보를 HTML 요소에 넣기
}

getWeather();
getWeekWeather();
