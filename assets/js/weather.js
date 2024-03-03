const API_KEY = `tdA81qDc4LAVznQDrQKG9zv0kmexr8kL`;
// const API_KEY = `IH2gk1Txd0lyoJXaRGnD996skbwQixXB`;
let weatherList = [];

const fetchWeatherData = async (url, dataHandler, renderCallback) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 데이터 처리 콜백을 통해 데이터 가공
        weatherList = dataHandler(data);

        console.log(weatherList);
        renderCallback();
    } catch (error) {
        console.error('날씨 데이터를 받아오는데 실패했습니다.', error);
    }
};
const BASE_URL = 'https://musical-puppy-68f92c.netlify.app';
const getCurrentWeather = () => {
    const url = `${BASE_URL}/currentconditions/v1/226081?apikey=${API_KEY}&language=ko-kr&details=true&metric=true`;
    fetchWeatherData(url, data => data, todayRender);
};

const getWeather = () => {
    const url = `${BASE_URL}/forecasts/v1/daily/1day/226081?apikey=${API_KEY}&language=ko-kr&details=true&metric=true`;
    fetchWeatherData(url, data => data.DailyForecasts, todayAddRender);
};

const getWeekWeather = () => {
    const url = `${BASE_URL}/forecasts/v1/daily/5day/226081?apikey=${API_KEY}&language=ko-kr&details=true&metric=true`;
    fetchWeatherData(url, data => data.DailyForecasts, weekendRender);
};


const getStyleTest = (Temperature) => {
    if (Temperature <= 3) {
        return '날씨가 추워요. 패딩 또는 두꺼운 아우터를 입으세요!';
    } else if (Temperature >=4 && Temperature <= 8) {
        return '쌀쌀한 날씨에요! 울코트, 히트텍, 기모를 입으세요!';
    } else if (Temperature >=9 && Temperature <= 12) {
        return '약간 써늘한 날씨에요! 자켓, 가디건을 입으세요!';    
    } else if (Temperature >=13 && Temperature <= 17) {
        return '산책하기 좋은 날씨에요! 얇은 가디건, 맨투맨을 입으세요!';    
    } else if (Temperature >=18 && Temperature <= 20) {
        return '봄이 왔어요! 블라우스, 긴팔, 면바지를 입으세요!';
    } else if (Temperature >=21 && Temperature <= 23) {
        return '여름이 왔어요! 반팔, 얇은 셔츠, 반바지를 입으세요!';
    } else if (Temperature >=24) {
        return '엄청 더워요! 민소매, 반팔, 반바지를 입으세요!';
    }
};

const getTodayLeftImg = (LongPhrase) => {
    if (LongPhrase.includes('추움')) {
        return '../assets/image/weather_img_1_1.png';
    } else if (LongPhrase.includes('눈')) {
        return '../assets/image/weather_img_4_1.png';
    } else if (LongPhrase.includes('비')) {
        return '../assets/image/weather_img_2_1.png';    
    } else if (LongPhrase.includes('흐림') || LongPhrase.includes('흐려짐')) {
        return '../assets/image/weather_img_6_1.png';    
    } else if (TLongPhrase.includes('구름이 줄어듦')) {
        return '../assets/image/weather_img_7_1.png';
    }
};

const getTodayRightImg = (LongPhrase) => {
    if (LongPhrase.includes('추움')) {
        return '../assets/image/weather_img_1_2.png';
    } else if (LongPhrase.includes('눈')) {
        return '../assets/image/weather_img_4_1.png';
    } else if (LongPhrase.includes('비')) {
        return '../assets/image/weather_img_2_2.png';    
    } else if (LongPhrase.includes('흐림') || LongPhrase.includes('흐려짐')) {
        return '../assets/image/weather_img_6_2.png';    
    } else if (TLongPhrase.includes('구름이 줄어듦')) {
        return '../assets/image/weather_img_7_2.png';
    }
};
const todayRender = () => {
    const todayWeather = document.querySelector('.today'); // HTML에서 날씨 정보를 보여줄 요소를 선택
    todayWeather.innerHTML = ''; // 이전의 날씨 정보를 초기화

    const forecast = weatherList[0]; // 첫 번째 날씨 예보 정보 가져오기
    const realFeelTemperature =  Math.round((forecast.RealFeelTemperature.Metric.Value));
    const Temperature = Math.round((forecast.Temperature.Metric.Value));
    const styleTest = getStyleTest(Math.round(forecast.Temperature.Metric.Value));

    const forecastDetails = `<div class="today_address">서울특별시</div> 
    <div class="today_cont">${forecast.WeatherText}</div>       
    <div class="today_temperature">${Temperature}°</div>
        <ul class="d-flex justify-content-center align-items-center">
            <li><span>습도 : </span>${forecast.RelativeHumidity}%</li>
            <li><span>체감 : </span>${realFeelTemperature}°</li>
            <li><span>바람 : </span>${forecast.Wind.Direction.Localized} ${forecast.Wind.Speed.Metric.Value}km/h</li>
        </ul>
        <div class="today_style">${styleTest}</div>  
    `;
    todayWeather.innerHTML = forecastDetails; // 가져온 날씨 정보를 HTML 요소에 넣기
}

const todayAddRender = () => {
    const todayAddWeather = document.querySelector('.today_add'); // HTML에서 날씨 정보를 보여줄 요소를 선택
    
    todayAddWeather.innerHTML = ''; // 이전의 날씨 정보를 초기화

    const forecast = weatherList[0]; // 첫 번째 날씨 예보 정보 가져오기
    const imageSrc = getTodayLeftImg(forecast.Day.LongPhrase);
    const imageSrc2 = getTodayRightImg(forecast.Day.LongPhrase);

    const minTemperature =  Math.round((forecast.Temperature.Minimum.Value));
    const maxTemperature =  Math.round((forecast.Temperature.Maximum.Value));

    const forecastAddDetails = `
            <div class="today_addTemperature"><span class="min">${minTemperature}°</span> / <span class="max">${maxTemperature}°</span></div>
            <div class="today_left"><img src="${imageSrc}">${forecast.Day.LongPhrase}</div>
            <div class="today_right"><img src="${imageSrc2}">${forecast.Day.LongPhrase}</div>
    `;
    todayAddWeather.innerHTML = forecastAddDetails; 
};

const getImageSrc = (IconPhrase) => {
    if (IconPhrase.includes('맑음')) {
        return '../assets/image/icon_sun.svg';
    } else if (IconPhrase.includes('흐림') || IconPhrase.includes('흐려짐')) {
        return '../assets/image/icon_cloud.svg';
    } else if (IconPhrase.includes('구름이 줄어듦')) {
        return '../assets/image/icon_cloud3.svg';
    } else if (IconPhrase.includes('안개')) {
        return '../assets/image/icon_mist.svg';
    } else if (IconPhrase.includes('비')) {
        return '../assets/image/icon_rain.svg';
    } else if (IconPhrase.includes('눈')) {
        return '../assets/image/icon_snow.svg';
    } else if (IconPhrase.includes('소나기')) {
        return '../assets/image/icon_shower.svg';
    } else if (IconPhrase.includes('번개')) {
        return '../assets/image/icon_lightning.svg';
    } else if(IconPhrase.includes('짙은구름')) {
        return '../assets/image/icon_cloud2.svg';
    } else if(IconPhrase.includes('추움') || IconPhrase.includes('바람')) {
        return '../assets/image/icon_wind.svg';
    }
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

        const minTemperature =  Math.round((forecast.Temperature.Minimum.Value));
        const maxTemperature =  Math.round((forecast.Temperature.Maximum.Value));

        const imageSrc = getImageSrc(forecast.Day.IconPhrase);
        const nightImageSrc = getImageSrc(forecast.Night.IconPhrase);

        return `
            <li class="week_item col-lg-6 d-flex justify-content-between align-items-center">
                <div class="cell_date d-flex flex-column align-items-center">
                     ${day}<span>${dateString}</span>
                </div>
                <div class="cell_icon"><img src="${imageSrc}">${forecast.Day.IconPhrase}</div>
                <div class="cell_icon"><img src="${nightImageSrc}">${forecast.Night.IconPhrase}</div>
                <div class="cell_temperature_lowest min">${minTemperature}°</div>
                <div class="cell_temperature_highest max">${maxTemperature}°</div>
            </li>
        `;
    }).join('');

    weekWeather.innerHTML = weekForecastDetail; // 가져온 날씨 정보를 HTML 요소에 넣기
}


getCurrentWeather();
getWeather();
getWeekWeather();
