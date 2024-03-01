window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var weatherLogo = document.querySelector('.weather_logo');
    var header = document.querySelector('header');
    var topCategory = document.querySelector('.top_category');


    if (scrollPosition > 0) {
        weatherLogo.innerHTML = `<img src="../weather/assets/image/symbol.svg"/>`;
        header.classList.add('scroll');
        topCategory.classList.add('scroll');
    } else { // 그 외의 경우
        weatherLogo.innerHTML = `<img src="../weather/assets/image/logo.svg"/>`;
        header.classList.remove('scroll');
        topCategory.classList.remove('scroll');
    }
});
