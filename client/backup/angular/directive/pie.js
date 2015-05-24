/**
 * Created by Tog on 6/14/2014.
 */
pieapp.directive('pie', function(pieSrv) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="easy-pie-chart txt-color-red easyPieChart" data-percent="0" data-size="90" data-pie-size="30"><span class="txt-color-blue font-md semi-bold">0</span><br>23</div>', // class : 'percent percent-sign'
        link: function(scope, element, attrs) {
            console.log("in pie ****************************************************************************")

            element.easyPieChart({
                barColor: function(percent) {
                    percent /= 100;
                    //return "rgb(" + Math.round(255 * percent) + ", " + Math.round(255 * (1 - percent)) + ", 0)";
                    return "green";
                },
                animate: 1500,
                lineWidth: 5,
                lineCap: 'butt',
                onStep: function(value) {
                    element.find("span").text(~~value);
                }
            });

            var pie_refresh = setInterval(function() {
                pieSrv.get(attrs.type, attrs.id).then(function(pie) {
                    console.log("pie " + attrs.id + " : pie change - " + pie)
                    //element.data('easyPieChart').update(pie);
                    //element.data('easyPieChart').update(Math.round(100 * Math.random()));
                    element.data('easyPieChart').update(pie.value);

                })
            }, 5000)

            scope.$on("$destroy", function(event) {
                //alert("exit")
                clearInterval(pie_refresh);
            })

        }
    }
})