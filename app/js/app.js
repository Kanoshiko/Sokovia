'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'myApp.runs']).
        config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/perso', {templateUrl: 'partials/perso.html', controller: 'CtrPerso'});
                $routeProvider.otherwise({redirectTo: '/perso'});
            }]);
