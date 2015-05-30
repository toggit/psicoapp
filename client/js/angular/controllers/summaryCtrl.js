app.controller('summaryCtrl', function($scope,dataSrv) {


    //##########################init #################################
    $scope.summary = dataSrv.getMistakes();

    console.log(( $scope.summary.exercises))
    console.log(( $scope.summary.list.length))
    console.log(( $scope.summary.exercises -  $scope.summary.list.length))

});
