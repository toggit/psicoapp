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
        url: '/login',
        templateUrl: "angular/templates/login.html",
        controller: 'login'

    }

    var registration = {
        name: 'registration',
        url: '/registration',
        templateUrl: "angular/templates/registration.html"//,
        //controller: 'login'

    }

    var about = {
        name: 'about',
        url: '/about',
        templateUrl: "angular/templates/about.html"//,
        //controller: 'login'

    }

    var contact = {
        name: 'contact',
        url: '/contact',
        templateUrl: "angular/templates/contact.html"//,
        //controller: 'login'

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

    var summary = {
        name: 'summary',
        url: '/summary',
        templateUrl: "angular/templates/summary.html"//,
        //controller: 'login'
    }


    $stateProvider
        .state('login', login)
        .state('registration', registration)
        .state('about', about)
        .state('contact', contact)
        .state('chars', chars)
        .state('exercise', exercise)
        .state('summary', summary)
        .state('menu', menu);

});