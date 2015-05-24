/**
 * Created by Tog on 6/9/2014.
 */
pieapp.directive('linechart', function(graphSrv) {

    return {

        // required to make it work as an element
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        //scope:{type: '='},
        // observe and manipulate the DOM
        link: function(scope, element, attrs) {
            console.log("attr is : "+attrs.type)
            var line =undefined;
            graphSrv.get(attrs.type,attrs.id).then(function (graph) {
                console.log("initialize graph "+graph)
                line =Morris.Area({
                    element: element,
                    data: graph,
                    xkey: ['date'],
                    ykeys: ['usage'],
                    labels: ['usage'],
                    parseTime: false,
                    resize: true
                });
            });
            
            console.log("Attr ID : "+attrs.id)
            
            var graph_refresh=setInterval(function () {
                scope.data = graphSrv.get(attrs.type,attrs.id).then(function (graph) {
                    console.log("linechart "+attrs.id+" : data changed setdata - "+ graph)
                    line.setData(graph);
                });
            },10000)

            scope.$on("$destroy", function (event) {
                //alert("exit")
                clearInterval(graph_refresh);
            })

        }

    };

});