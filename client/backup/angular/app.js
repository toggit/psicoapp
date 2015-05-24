/**
 * Created by Tog on 6/1/2014.
 */

var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider) {
    //$urlRouterProvider.when('', '/connection');

    /* var connection = {
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
        controller: "connMenuCtrl"

    }
*/

    var login = {
        name: 'login',
        url: '',
        templateUrl: "angular/templates/login.html",
        controller: 'login'

    }

    var menu = {
        //url: 'menu',
        name: 'menu',
        url: '',
        templateUrl: "angular/templates/menu.html",
        controller: function($scope,$state){
            $scope.go = function(langdata){ $state.go('chars',{lang:langdata})}
        }

    }

    var chars = {
        name: 'chars',
        url: '/chars/:lang',
        templateUrl: "angular/templates/chars.html",
        controller: 'chars'
    }

    var exercise = {
        name: 'exercise',
        url: '/exercise/:lang',
        templateUrl: "angular/templates/exercise.html",
        controller: 'exercise'
    }


    $stateProvider
        //.state('login', login)
        .state('chars', chars)
        .state('exercise', exercise)
        .state('menu', menu);

});