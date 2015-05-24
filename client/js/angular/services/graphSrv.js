/**
 * Created by Tog on 6/1/2014.
 */
pieapp.factory('graphSrv',function($http,$q){
    var cpujson = {};
    var memjson = {};
    var lajson = {};
    return{
        get: function(type,id){
            
        	console.log("ID of connection : " +id);
        	console.log("type of connection : " +type);
            var server = undefined;
            /*if(type == 'cpu')server='http://192.168.1.22/morris_cpu.txt';
            if(type == 'mem')server='http://192.168.1.22/morris_mem.txt';
            if(type == 'la')server='http://192.168.1.22/morris_la.txt';*/

            if(type == 'cpu')server='http://localhost:8080/resourcepie/rest/dashboard/graph/cpu_status/hour/'+id;
            if(type == 'mem')server='http://localhost:8080/resourcepie/rest/dashboard/graph/mem_status/hour/'+id;
            if(type == 'la')server='http://localhost:8080/resourcepie/rest/dashboard/graph/la_status/hour/'+id;
            
            console.log("server graph url : "+server);
            
                var deffered = $q.defer();
                $http({
                    url:server,
                    params: { 'foobar': new Date().getTime() }
                }).
                    success(function(data){
                        deffered.resolve(data);
                        console.log("data of graph : " + data);
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