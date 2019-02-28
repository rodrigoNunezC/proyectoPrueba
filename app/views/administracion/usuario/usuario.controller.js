'use strict';
angular
    .module('pruebaTecnica')
    .controller('usuarioController', ['$rootScope', '$scope', '$location', 'toastr', '$route','usuarioService',
        function ($rootScope, $scope, $location, toastr, $route, usuarioService) {
            var vm = this;

            vm.fx = {
            }

            vm.ui = {
                usuarios: [],
                view: {
                    active: 'usuarios',
                    returnTo: 'usuarios'
                }
            }

        

        }]);