angular.module('bidding').controller('main', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    $scope.auctionId = 1;
    $scope.bidStep = 1.00;

    $scope.setMessage = function (message) {
        $scope.message = message;

        $timeout(function () {
            $scope.message = {};
        }, 3000);
    };

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
            $scope.currentPrice = responseData.data.price;
        },
        function (error) {
            throw new Error('Failed to load current auction price: ' + error.statusText);
        }
    );

    var eventBus = new vertx.EventBus('http://localhost:8082/eventbus');

    eventBus.onopen = function () {
        eventBus.registerHandler('auction.' + $scope.auctionId, function (message) {
            $scope.currentPrice = JSON.parse(message).price;
            $scope.setMessage({status: 'success', text: "New offer in auction!"});

            //ToDo: update feed
            //feed += JSON.parse(message).buyer + ' offer: EUR ' + JSON.parse(message).price + '\n';
        });
    }

}]);