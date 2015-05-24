/**
 * Created by Tog on 6/2/2014.
 */
pieapp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

pieapp.directive('onMainFinish', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('mainFinish');
                });
            }
        }
    }
});

pieapp.directive('onFinish', function ($timeout,connectionSrv) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            /*
            element.on('mouseup keypress',function(event){
                console.log("scope.conForm.$valid : "+scope.conForm.$valid);
                console.log("element.text() : "+element.text());
                console.log("element.text() is true : "+element.text()=="Finish");
                console.log("scope.conForm.$valid is true : "+scope.conForm.$valid==true);
                 if(element.text()=="Finish" && scope.conForm.$valid){
                    scope.$emit('Finish');}
            });*/



            loadScript("js/plugin/fuelux/wizard/wizard.js", fueluxWizard);

            function fueluxWizard() {
                var wizard = $('.wizard').wizard();

                wizard.on('finished', function (e, data) {
                    //$("#fuelux-wizard").submit();
                    //console.log("submitted!");
                    console.log("in finish : "+scope.conn)
                    console.log("in finish : "+scope.conForm.$valid)

                    if (scope.conForm.$valid) {
                        console.log("Finish!!!");
                        console.log(scope.conn);
                        connectionSrv.Create(scope.conn);
                        $.smallBox({
                            title: "Congratulations! Your form was submitted",
                            content: "<i class='fa fa-clock-o'></i> <i>1 seconds ago...</i>",
                            color: "#5F895F",
                            iconSmall: "fa fa-check bounce animated",
                            timeout: 4000
                        });
                        scope.conn = {}
                    }
                    else{
                    	$.smallBox({
                            title: "Error! Your form was not submitted",
                            content: "<i class='fa fa-clock-o'></i> <i>Please Check Syntax</i>",
                            color: "red",
                            iconSmall: "fa fa-check bounce animated",
                            timeout: 4000
                        });
                    }


                });
            }

        }
    }
});
