window.onload = function() {
    fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
       
        // header가 로드된 후에 이벤트 설정
        var pageTitle = document.querySelector('.page_title');
        var navItems = document.querySelectorAll('.top_category li');

        navItems.forEach(function(item) {
            item.classList.remove('on');
            if (item.textContent.trim() === pageTitle.textContent.trim()) {
                item.classList.add('on');
            }
        });    
    });

    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;

        // header가 로드된 후에 이벤트 설정
        var pageTitle = document.querySelector('.page_title');
        var footNavItems = document.querySelectorAll('.foo_list li');

        footNavItems.forEach(function(item) {
            item.classList.remove('on');
            if (item.textContent.trim() === pageTitle.textContent.trim()) {
                item.classList.add('on');
            }
        });    
        
        
    });
}
