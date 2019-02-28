(function () {
    'use strict';

    angular
        .module('pruebaTecnica.components', [])

        .component('componentLookupUsuario', {
            bindings: {
                view: '=',
                model: '=',
                isRequired: '<',
                isReadonly: '<',
                formSubmit: '=',
                labelClass: '@',
                labelText: '@',
            },

            controllerAs: 'cvm',
            controller: componentLookupUsuario,
            templateUrl: 'app/components/templates/component.lookup.usuario.html'
        })

        .component('componentLookupUsuarios', {
            bindings: {
                view: '=' ,
                labelText: '@'
            },
            controllerAs: 'cvm',
            controller: componentLookupUsuarios,
            templateUrl: 'app/components/templates/component.lookup.usuarios.html'
        })

        .component('componentUsuario', {
            bindings: {
                view: '=',
                labelText: '@',
                usuarios: '=',
                isReadonlyNameUser: '<',
            },
            controllerAs: 'cvm',
            controller: componentUsuario,
            templateUrl: 'app/components/templates/component.usuario.html'
        })
    

    componentLookupUsuario.$inject = ['$scope','$timeout', 'toastr','usuarioService'];
    function componentLookupUsuario($scope, $timeout, toastr, usuarioService) {
        var cvm = this;

        cvm.fx = {
            showMainParent: showMainParent,
            showLookupUsuarios: showLookupUsuarios,
            getUserByUsername: getUserByUsername

        };

        cvm.ui = {
            showValidation: false,
            usuarios: [],
            model: {username: null},
            isRequired: false,
            view: {
                active :null
                }
        }

        cvm.$onInit = function () {
            if (typeof cvm.labelClass != 'undefined') {
                cvm.ui.labelClass = cvm.labelClass;
            }

            if (typeof cvm.labelText != 'undefined') {
                cvm.ui.labelText = cvm.labelText;
            }

            $scope.$on('updateUser', function (evt, data) {
                if (cvm.ui.usuarios.length != 0) {
                   var usuario = cvm.ui.usuarios.filter(x => x.id == data.id);
                    toastr.success("actualización exitosa");

                }
            });

          

            getAllUser();
        }

        function showMainParent() {
            if (cvm.view != undefined) {
                cvm.view.active = cvm.view.returnTo;
            }
        }

        function showLookupUsuarios() {
            cvm.ui.view.active = 'componentLookupUsuarios';
            var data = cvm.ui.usuarios;
            $scope.$broadcast('allUsers', data);
        }

        function getAllUser() {
            usuarioService.getAll().then(function (data) {
                cvm.ui.usuarios = data;

            }, function (message) {
                toastr.error(message, "comunas!");
            });
        }

        function getUserByUsername() {
            if (cvm.ui.model.username != null && cvm.ui.model.username != "") {
                var usuario = cvm.ui.usuarios.filter(x => x.username == cvm.ui.model.username);
                if (usuario.length != 0) {
                    cvm.ui.view.active = 'componentUsuario';
                    $scope.$broadcast('showComponentUser', usuario[0]);
                } else {
                    cvm.ui.model.username = "";
                    toastr.error("No se encontraron resultados");
                }
            } else {
                toastr.info("debe ingresar un parametro de busqueda");
            }
        }
    }

   
    componentLookupUsuarios.$inject = ['$rootScope','$scope','toastr', '$location', 'usuarioService'];
    function componentLookupUsuarios($rootScope, $scope , toastr, $location, usuarioService) {
        var cvm = this;

        cvm.fx = {
            rowSelected: rowSelected,
            rowUserDelete: rowUserDelete
        };

        cvm.ui = {
            showValidation: false,
            filter: {},
            usuario: {},
            view: {
                active: null
            }
        }

        cvm.$onInit = function () {
            if (typeof cvm.labelText != 'undefined') {
                cvm.ui.labelText = cvm.labelText;
            }

            $scope.$on('allUsers', function (evt, data) {
                cvm.ui.usuarios = data;

            });

         

        }

        function rowUserDelete(index) {
            cvm.ui.usuarios.splice(index, 1);
            cvm.ui.usuariosToDisplay = cvm.ui.usuarios;

        }

        function rowSelected(item) {
            if (typeof item != 'undefined') {
                var data = item;
                cvm.ui.usuario = item;
                cvm.view = 'componentUsuario';
                $rootScope.$broadcast('showComponentUser', data);
            }
        }
    }

    componentUsuario.$inject = ['$rootScope', '$scope' , 'toastr', 'usuarioService'];
    function componentUsuario($rootScope, $scope ,toastr, usuarioService) {
        var cvm = this;

        cvm.fx = {
            cleanInputs: cleanInputs,
            sendUpdateParent: sendUpdateParent
        };

        cvm.ui = {
            
            view: {
                active: null
            }
        }

        cvm.$onInit = function () {
            if (typeof cvm.labelText != 'undefined') {
                cvm.ui.labelText = cvm.labelText;
            }

            if (typeof cvm.isReadonlyNameUser != 'undefined') {
                cvm.ui.isReadonlyNameUser = cvm.isReadonlyNameUser;
            }

            $scope.$on('showComponentUser', function (evt, data) {
                if (data != 'undefined') {
                    cvm.ui.model = data;
                }

            });
        }

        function cleanInputs() {
            cvm.ui.model = {
                username: null,
                id: cvm.ui.model.id,
                name: cvm.ui.model.name,
                website: null,
                address:{ city: null },
                phone:null,
                email: null

            }
        }


        function sendUpdateParent() {
            $scope.$emit('updateUser', cvm.ui.model);
        }

      
        
    
    }

})();