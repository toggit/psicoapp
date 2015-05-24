/**
 * Created by Tog on 6/14/2014.
 */
pieapp.factory('pieSrv',function($http,$q){
    var cpujson = {};
    var memjson = {};
    var lajson = {};
    return{
        get: function(type,id){
            //var p=
            var server = undefined;
            /*if(type == 'cpu')server='http://192.168.1.22/morris_cpu.txt';
            if(type == 'mem')server='http://192.168.1.22/morris_mem.txt';
            if(type == 'la')server='http://192.168.1.22/morris_la.txt';
            server='http://192.168.1.22/pie.txt';*/

            if(type == 'cpu')server='http://localhost:8080/resourcepie/rest/dashboard/gauge/hit_ratio/'+id;
            if(type == 'mem')server='http://localhost:8080/resourcepie/rest/dashboard/gauge/host_response/'+id;
            if(type == 'la')server='http://localhost:8080/resourcepie/rest/dashboard/gauge/load_average/'+id;

            var deffered = $q.defer();
            $http({
                url:server,
                params: { 'foobar': new Date().getTime() }
            }).
                success(function(data){
                    deffered.resolve(data);
                    console.log("pie data : "+data.value);
                    //return data;
                    if(type == 'cpu')cpujson=data;
                    if(type == 'mem')memjson=data;
                    if(type == 'la')lajson=data;
                }).
                error(function(data,status){
                    deffered.reject(status);
                    //return {error:"failed"}
                });
            return deffered.promise;
            //return p;
        },
        bind: function (type) {
            if(type == 'cpu')return cpujson;
            if(type == 'mem')return memjson;
            if(type == 'la')return lajson;
            return [{date:"Error",'usage':"Eror"}];
        }

    }
});