/**
 * Created by Tog on 6/3/2014.
 */
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