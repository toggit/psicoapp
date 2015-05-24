/**
 * Created by Tog on 6/1/2014.
 */

var pieapp = angular.module('app', ['ui.router']);

pieapp.config(function($stateProvider) {
    //$urlRouterProvider.when('', '/connection');

    var connection = {
        abstract: true,
        name: 'connection',
        url: "/connection",
        //templateUrl: "angular/templates/widgets.html",
        templateUrl: "angular/templates/table.html",
        controller: 'connectionCtrl',
        resolve: {
            re: function(connectionSrv) {
                return connectionSrv.get();
            }
        }

    }

    var addConnection = {
        name: 'connection.add',
        url: "",
        templateUrl: "angular/templates/wizard.html"
        //controller:'wizardCtrl'
        //resolve:{re : function(connectionSrv){return connectionSrv.get();}}

    }

    var connectionMenu = {
        abstract: true,
        name: 'connectionMenu',
        url: "/connectionMenu/:id",
        template: "<h1>Connection Menu {{id}}</h1> <br> <div ui-view></div>",
        /*controller : function($scope,$stateParams){
            $scope.id = $stateParams.id;
            setInterval(function(){console.log("morris"); $scope.$emit('morris');},10000);
        }*/
        controller: "connMenuCtrl"

    }

    var chart = {
        name: 'connectionMenu.chart',
        url: "",
        templateUrl: "angular/templates/morris.html"
    }

    var connectionLog = {
        name: 'connectionLog',
        url: "/Log/:id",
        template: "<h1>Connection Log {{id}}</h1>",
        controller: function($scope, $stateParams) {
            $scope.id = $stateParams.id
        }

    }

    var connectionSetting = {
        name: 'connectionSetting',
        url: "/Setting/:id",
        template: "<h1>Connection Setting {{id}}</h1>",
        controller: function($scope, $stateParams) {
            $scope.id = $stateParams.id
        }
    }

    var table = {
        //abstract:true,
        name: 'table',
        url: "/table",
        templateUrl: "angular/templates/table.html",
        controller: 'tableCtrl' //,
        //resolve:{aa : function(connectionSrv){return connectionSrv.get();}}
    }

    var tableaddConnection = {
        name: 'table.add',
        url: "",
        templateUrl: "angular/templates/wizard.html"
        //controller:'connectionCtrl'
        //resolve:{re : function(connectionSrv){return connectionSrv.get();}}

    }

    var test = {
        name: 'test',
        url: "/test",
        templateUrl: "angular/templates/datatables.html",
        controller: 'tctrl'
        //resolve:{re : function(connectionSrv){return connectionSrv.get();}}

    }

    var page3 = {
        name: 'ppp',
        url: "/ppp",
        templateUrl: "angular/templates/pppp.html"

    }

    $stateProvider
        .state('connection', connection)
        .state('connection.add', addConnection)
        .state('connectionLog', connectionLog)
        .state('connectionSetting', connectionSetting)
        .state('table', table)
    //.state('table.add',tableaddConnection)
    .state('connectionMenu', connectionMenu)
        .state('connectionMenu.chart', chart)
        .state('test', test)
        .state('ppp', page3);

});