
window.onload = function() {
    fetch('../weatherdiary/pages/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

    fetch('../weatherdiary/pages/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });
}
