/**
 * Created by Tog on 6/3/2014.
 */
app.controller('login', function($scope, $state) {
    console.log("login controller loaded");

    $scope.login = function() {
        console.log("email is : " + $scope.email);
        console.log("password is : " + $scope.password);

        if ($scope.email == "tog@gmail.com" && $scope.password == "1q2w3e4r")
            $state.go('menu');
        else alert("wrong password!")
    }

    
})