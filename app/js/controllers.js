'use strict';
/* Controllers */

angular.module('myApp.controllers', []).
        controller('CtrPerso', ['$rootScope', '$scope', function ($rootScope, $scope) {
                $('#myTab a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                });
            }
        ]);
