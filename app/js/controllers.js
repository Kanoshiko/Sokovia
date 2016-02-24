'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
        controller('CtrPresentation', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrPerso', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrType', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrLimitation', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrFaction', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrAllegeance', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrSpecialite', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]).
        controller('CtrCompetences', ['$rootScope', '$scope', function ($rootScope, $scope) {
                $('#myTab a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                })
            }]).
        controller('CtrPouvoirInhumain', ['$rootScope', '$scope', function ($rootScope, $scope) {
            }]);
