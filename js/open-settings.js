
window.onload = function() {
    var default_timer = '30:00';
    var default_short_break = '5:00';
    var default_long_breack = '15:00';

    var currentTimer = default_timer;

    var counter = document.getElementsByClassName("counter")[0];
    var cButton = document.getElementsByClassName("action")[0];

    counter.innerHTML = currentTimer;

    var pom_btn = document.getElementById('pom');
    var sb_btn = document.getElementById('sb');
    var lb_btn = document.getElementById('lb');

    var pom_t = document.getElementById('pom-set');

    counter.innerHTML = currentTimer;

    pom_btn.onclick = function(){
        pom_btn.style.color = "#161932";
        pom_btn.style.background = "#F87070";
        sb_btn.style.color = "#4F5694";
        sb_btn.style.background = "#161932";
        lb_btn.style.color = "#4F5694";
        lb_btn.style.background = "#161932";


        currentTimer = default_timer;
        counter.innerHTML = currentTimer;
    }

    sb_btn.onclick = function(){
        pom_btn.style.color = "#4F5694";
        pom_btn.style.background = "#161932";
        sb_btn.style.color = "#161932";
        sb_btn.style.background = "#F87070";
        lb_btn.style.color = "#4F5694";
        lb_btn.style.background = "#161932";


        currentTimer = default_short_break;
        counter.innerHTML = currentTimer;
    }

    lb_btn.onclick = function(){
        pom_btn.style.color = "#4F5694";
        pom_btn.style.background = "#161932";
        sb_btn.style.color = "#4F5694";
        sb_btn.style.background = "#161932";
        lb_btn.style.color = "#161932";
        lb_btn.style.background = "#F87070";


        currentTimer = default_long_breack;
        counter.innerHTML = currentTimer;
    }

    // Get the modal
    var modal = document.getElementById("stWindow");


    // Get the button that opens the modal
    var btn = document.getElementById("setBtn");


    // Get the <span> element that closes the modal

    var closeImg = document.getElementById("stClose");

    var apply = document.getElementById("ap")

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeImg.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var f1 = document.getElementById("first-font");
    var f2 = document.getElementById("second-font");
    var f3 = document.getElementById("third-font");

    var currentFont = 1;

    f1.onclick = function(){
        currentFont = 1;
        f1.style.background = "black";
        f1.style.color = "white";
        f2.style.background = "gray";
        f2.style.color = "black";
        f3.style.background = "gray";
        f3.style.color = "black";
    }
    f2.onclick = function(){
        currentFont = 2;
        f1.style.background = "gray";
        f1.style.color = "black";
        f2.style.background = "black";
        f2.style.color = "white";
        f3.style.background = "gray";
        f3.style.color = "black";
    }
    f3.onclick = function(){
        currentFont = 3;
        f1.style.background = "gray";
        f1.style.color = "black";
        f2.style.background = "gray";
        f2.style.color = "black";
        f3.style.background = "black";
        f3.style.color = "white";
    }

    var c1 = document.getElementById("first-color");
    var c2 = document.getElementById("second-color");
    var c3 = document.getElementById("third-color");

    var currentColor = 1;

    c1.onclick = function(){
        currentColor = 1;
        c1.style.border = "2px solid blue";
        c2.style.border = "1px solid black";
        c3.style.border = "1px solid black";
    }
    c2.onclick = function(){
        currentColor = 2;
        c1.style.border = "1px solid black";
        c2.style.border = "2px solid blue";
        c3.style.border = "1px solid black";
    }
    c3.onclick = function(){
        currentColor = 3;
        c1.style.border = "1px solid black";
        c2.style.border = "1px solid black";
        c3.style.border = "2px solid blue";
    }

    function setOptions(colorName, fontName) {
        localStorage.setItem('color', colorName);
        localStorage.setItem('font', fontName)
        document.documentElement.className = colorName + ' ' + fontName;
    }

    var col = ['color-option-one', 'color-option-two', 'color-option-three'];
    var fon = ['font-option-one', 'font-option-two', 'font-option-three'];

    (function () {
        setOptions(col[currentColor - 1], fon[currentFont - 1]);
    })();

//    apply.onclick = function () {
//        if (currentColor == 1) {
//            setColor('color-option-one');
//        } else {
//            if (currentColor == 2){
//                setColor('color-option-two');
//            } else {
//                setColor('color-option-three');
//            }
//        }
//    }

    t = currentTimer;

    apply.onclick = function () {
        setOptions(col[currentColor - 1], fon[currentFont - 1]);
        t = pom_t.value * 60;

    }

    // timer

    function formatTime (num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function secondsToString(secondsNum) {
        var tSeconds = secondsNum % 60;
        var tMinutes = (secondsNum - tSeconds) / 60;
        return formatTime(tMinutes) + ':' + formatTime(tSeconds);
    }

    var tButtonState = 'start'; // ['start', 'pause', 'restart']

    var myVar;

    function timerStart(){
        t = t - 1;
        counter.innerHTML = secondsToString(t);

        myVar = setInterval(function(){
            if (t == 0){
                tButtonState = 'restart';
                cButton.innerHTML = 'R&ensp;E&ensp;S&ensp;T&ensp;A&ensp;R&ensp;T';
                clearInterval(myVar);
            } else {
                t = t - 1;
                counter.innerHTML = secondsToString(t);
            }
        }, 1000);
        tButtonState = 'pause';
        cButton.innerHTML = 'P&ensp;A&ensp;U&ensp;S&ensp;E'
    }

    cButton.onclick = function(){
        if (tButtonState === 'start') {
            timerStart();
        } else if (tButtonState === 'pause') {
            timerPouse();
        } else if (tButtonState === 'restart') {
            t = 20;
            timerRestart();
        }
    }

    function timerPouse(){
        tButtonState = 'start';
        cButton.innerHTML = 'S&ensp;T&ensp;A&ensp;R&ensp;T'
        clearInterval(myVar);
    }
    function timerRestart(){
        timerStart();
    }

}
