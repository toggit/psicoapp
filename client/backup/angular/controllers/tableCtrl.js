/**
 * Created by Tog on 6/1/2014.
 */
pieapp.controller('tableCtrl',function($scope,connectionSrv) {

    console.log("table ctrl loaded")

    $scope.connections = connectionSrv.bind();
    var table_refresh = setInterval(function () {
        console.log("conns now binding")
        $scope.connections = connectionSrv.bind();
    }, 10000);

    $scope.$on('$destroy', function (event) {
        clearInterval(table_refresh);
    });

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        alert("ngRepeatFinished tableCtrl");
        pageSetUp();
    });




    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.connections.length / $scope.pageSize);
    }


})

/*
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
pieapp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }

})
*/