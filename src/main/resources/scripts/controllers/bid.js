angular.module('bidding').controller('bid', ['$scope', '$http', function ($scope, $http) {

    $scope.$watch('currentPrice', function (newPrice) {
        $scope.bidPrice = newPrice + $scope.bidStep;
    });

    $scope.$watch('bidPrice', function () {
        $scope.minimalBidPrice = ($scope.bidPrice <= $scope.currentPrice + $scope.bidStep);
    });

    $scope.decrementBidPrice = function () {
        if ($scope.bidPrice > $scope.currentPrice + $scope.bidStep) {
            $scope.bidPrice -= $scope.bidStep;
        }
    };

    $scope.incrementBidPrice = function () {
        $scope.bidPrice += $scope.bidStep;
    };

    $scope.bid = function () {
        //ToDo
        return false;
    };

}]);