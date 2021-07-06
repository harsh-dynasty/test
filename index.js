(function () {

    function loadZendeskChat(callback) {
        var zdscript = document.createElement('script');
        zdscript.setAttribute('id', 'ze-snippet');
        zdscript.src = 'https://static.zdassets.com/ekr/snippet.js?key=XXX-XXX-XXX-XXX';
        (document.getElementsByTagName('body')[0]).appendChild(zdscript);

        window.zdonload = setInterval(function () {
            if (typeof zE !== "undefined" && typeof zE.activate !== "undefined") {
                clearInterval(window.zdonload);
                callback();
            }
        }, 50, null)
    };
    window.loadAndOpenZendeskChat = function () {
        var button = document.getElementById('zdbutton');
        localStorage.setItem('ff_zd_hasOpened', true);
        button.innerHTML = 'Loading...';
        loadZendeskChat(function () {
            window.setTimeout(function () {
                zE.activate();
                button.parentNode.removeChild(button);
            }, 1000);
        });
    }
    if (localStorage.getItem('ff_zd_hasOpened')) {
        loadZendeskChat(function () { });
    } else {
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<button id="zdbutton" aria-label="Launch Help Chat Window" onClick="window.loadAndOpenZendeskChat();">Help</button>');
    }
}());