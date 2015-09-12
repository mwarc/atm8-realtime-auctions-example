var auction_id = 1;

function init() {
    loadCurrentPrice();
    registerHandlerForUpdateCurrentPriceAndFeed();
};

function loadCurrentPrice() {
    var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                document.getElementById('current_price').innerHTML = 'EUR ' + JSON.parse(xmlhttp.responseText).price;
            } else {
                document.getElementById('current_price').innerHTML = 'EUR 0.00';
            }
        }
    };
    xmlhttp.open("GET", "http://localhost:8080/api/auctions/" + auction_id);
    xmlhttp.setRequestHeader("Accept", "application/json");
    xmlhttp.send();
};

function registerHandlerForUpdateCurrentPriceAndFeed() {
    var eventBus = new vertx.EventBus('http://localhost:8082/eventbus');
    eventBus.onopen = function () {
        eventBus.registerHandler('auction.' + auction_id, function (message) {
            document.getElementById('current_price').innerHTML = 'EUR ' + JSON.parse(message).price;
            document.getElementById('feed').value += JSON.parse(message).buyer + ' offer: EUR ' + JSON.parse(message).price + '\n';
            document.getElementById('message').innerHTML = 'New offer in auction!';
        });
    }
};

function bid() {
    var newPrice = parseFloat(Math.round(document.getElementById('my_bid_value').value.replace(',','.') * 100) / 100).toFixed(2);

    var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status != 200) {
                document.getElementById('message').innerHTML = 'Invalid price!';
            }
        }
    };
    xmlhttp.open("PATCH", "http://localhost:8080/api/auctions/" + auction_id);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({price: newPrice}));
};
