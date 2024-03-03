
window.onload = function() {
    fetch('../weatherdiary/pages/header.html')
    .then(response => response.text())
    .then(data => { 
        document.getElementById('header').innerHTML = data;

         // header가 로드된 후에 이벤트 설정
         const topCategoryOn = document.querySelectorAll('.top_category li');
 
         if (topCategoryOn.length > 0) {  // 선택된 요소가 하나 이상 있는지 확인
             topCategoryOn[0].classList.add('on');
         } else {
             console.log('No elements matched the selector');
         }
    });

    fetch('../weatherdiary/pages/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
         // header가 로드된 후에 이벤트 설정
         const footNavOn = document.querySelectorAll('.foo_list li');
         
         if (footNavOn.length > 0) {  // 선택된 요소가 하나 이상 있는지 확인
            footNavOn[0].classList.add('on');
         } else {
             console.log('No elements matched the selector');
         }
    });
}
