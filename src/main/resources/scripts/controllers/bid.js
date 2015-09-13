angular.module('bidding').controller('bid', ['$scope', '$http', function ($scope, $http) {

    $scope.$watch('currentPrice', function (newPrice) {
        $scope.newPrice = newPrice;
    });

    $scope.bid = function () {

        var requestParams = {
            method: 'PATCH',
            url: 'http://localhost:8080/api/auctions/' + $scope.auctionId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                price: $scope.newPrice
            }
        };

        $http(requestParams).then(
            function (data) {
                //ToDo: update message?
            },
            function (error) {
                //ToDo: update message
                throw new Error('Bidding failed: ' + error.statusText);
            }
        );

        return false;
    };

}]);