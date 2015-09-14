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

    //ToDo
    $scope.endingTime = {};
    $scope.currentPrice = 12.00;

}]);