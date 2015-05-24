/**
 * Created by Tog on 6/1/2014.
 */
pieapp.controller('connectionCtrl',function($scope,connectionSrv){

    console.log("connection CTRL");
    $scope.connections = connectionSrv.bind();

    $scope.$on("CONNECTION_LOADED", function (temp) {
        console.log("CONNECTION_LOADED connCtrl now binding");
        $scope.connections = connectionSrv.bind();
    })

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        alert("ngRepeatFinished connectionCtrl");
        //test();
        //main_func();
        pageSetUp();
    });



    $scope.conn;
    // Wizard Regex
    $scope.PortRegex =/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

    $scope.isIP = false;
    $scope.setisIP = function (a) {
        if(a==true) $scope.isIP = true;
        if(a==false) $scope.isIP = false;
    }
    $scope.Pattern = (function() {
        var regexip =/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
        return {
            test: function(value) {
                console.log("value is : "+ value )
                console.log("isIP is : "+ $scope.isIP )
                console.log("regex is : "+ regexip.test(value) )
                if( $scope.isIP == false ) return true;
                else return regexip.test(value);
            }
        };
    })();



})


