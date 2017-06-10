'use strict';

function showIt() {
    var numStr = event.target.id;
    var box = document.getElementById('pre' + numStr);
    var butt = document.getElementById(numStr);
    butt.textContent = butt.textContent === 'Show Answer' ? 'Hide Answer' : 'Show Answer';
    box.classList.toggle('vis');
}

function show(str1, str2) {
    var targ = document.getElementById(str1);
    var butt = document.getElementById(str2);
    targ.classList.toggle('hidden');
    butt.classList.toggle('showing');
}
