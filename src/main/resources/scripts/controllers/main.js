angular.module('bidding').controller('main', ['$scope', '$http', function ($scope, $http) {

    $scope.auctionId = 1;

    var prepareEndingTime = function (endingTimeObj) {
        return endingTimeObj.dayOfMonth + '.'
            + endingTimeObj.monthValue + '.'
            + endingTimeObj.year + ' '
            + endingTimeObj.hour + ':'
            + endingTimeObj.minute + ':'
            + endingTimeObj.second;
    };

    var requestParams = {
        method: 'GET',
        url: 'http://localhost:8080/api/auctions/' + $scope.auctionId,
        headers: {
            'Accept': 'application/json'
        }
    };

    $http(requestParams).then(
        function (responseData) {
            $scope.endingTime = prepareEndingTime(responseData.data.endingTime);
            $scope.currentPrice = responseData.data.price; //ToDo: format price
        },
        function (error) {
            throw new Error('Failed to load current auction price: ' + error.statusText);
        }
    );

    var eventBus = new vertx.EventBus('http://localhost:8082/eventbus');

    eventBus.onopen = function () {
        eventBus.registerHandler('auction.' + $scope.auctionId, function (message) {
            $scope.currentPrice = JSON.parse(message).price;

            //ToDo: update feed and message
            //feed += JSON.parse(message).buyer + ' offer: EUR ' + JSON.parse(message).price + '\n';
            //message = 'New offer in auction!';
        });
    }

}]);