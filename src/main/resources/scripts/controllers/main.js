angular.module('bidding').controller('main', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    $scope.auctionId = 1;
    $scope.bidStep = 1.00;
    $scope.feeds = [];

    $scope.setMessage = function (message) {
        $scope.message = message;

        $timeout(function () {
            $scope.message = {};
        }, 3000);
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
            $scope.endingTime = responseData.data.endingTime;
            $scope.currentPrice = responseData.data.price;
        },
        function (error) {
            throw new Error('Failed to load current auction price: ' + error.statusText);
        }
    );

}]);