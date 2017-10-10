(function(doc, win,b) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = Math.max(640,Math.min(320,docEl.clientWidth)); 
            if (!clientWidth) return;
            docEl.style.fontSize =(clientWidth / 640) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window,document.querySelectorAll('body')[0]);