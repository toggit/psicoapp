/**
 * Created by Tog on 6/1/2014.
 */
app.factory('connectionSrv',function($http,$q){
    var conjson = undefined;
    return{
        get: function(){
            //var p=
            var good = 'http://192.168.1.150:8089/psico/words/123';
            var server = 'http://psicoproject.herokuapp.com/psico/words/123';
                var deffered = $q.defer();
                $http({
                    url:good,
                    params: { 'foobar': new Date().getTime() }
                }).
                    success(function(data){
                        deffered.resolve(data);
                        //return data;
                        conjson = data;
                    }).
                    error(function(data,status){
                        deffered.reject(status);
                        //return {error:"failed"}
                    });
            return deffered.promise;
            //return p;
        },
        bind: function () {
            return conjson;
        },



        Create: function(data){
            //var p=
            var server = 'http://192.168.1.22/connectiona.txt';
            var good = 'http://192.168.1.150:8080/resourcepie/rest/connection';
            var deffered = $q.defer();
            $http({
                method:"post",
                url:good,
                data:data,
                params: { 'foobar': new Date().getTime() }
            }).
                success(function(data){
                    deffered.resolve(data);
                    console.log("success massage : "+data);
                    //return data;
                    conjson = data;
                }).
                error(function(data,status){
                    deffered.reject(status);
                    //return {error:"failed"}
                });
            return deffered.promise;
            //return p;
        },
        Delete: function(data){
            //var p=
            var server = 'http://192.168.1.22/connectiona.txt';
            var good = 'http://192.168.1.150:8080/resourcepie/rest/connection';
            var deffered = $q.defer();
            $http({
                method:"post",
                url:server,
                data:data,
                params: { 'foobar': new Date().getTime() }
            }).
                success(function(data){
                    deffered.resolve(data);
                    //return data;
                    conjson = data;
                }).
                error(function(data,status){
                    deffered.reject(status);
                    //return {error:"failed"}
                });
            return deffered.promise;
            //return p;
        }

    }
});