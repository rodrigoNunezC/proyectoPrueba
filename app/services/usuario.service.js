(function () {
    'use strict';

    angular
        .module('pruebaTecnica')
        .factory('usuarioService', usuarioService);

    usuarioService.$inject = ['$http', '$q'];

    function usuarioService($http, $q) {

        var baseUrl = 'https://jsonplaceholder.typicode.com/';
        var _entity = null;

        var service = {
            getAll: getAll,
            entity: entity


        };
        return service;

        function getAll() {
            var request = $http({
                method: "Get",
                url: baseUrl + "users"
            });

            return request.then(handleSuccess, handleError);
        }

        function entity(model) {
            if (model !== undefined) {
                _entity = model;
            }
            return _entity;
        }

        function handleError(response) {
            var returnMessage = ""
            if (!angular.isObject(response.data) ||
                !response.data.Message) {
                returnMessage = "Se ha presentado un error desconocido; por favor póngase en contacto con el administrador del sistema";
            }
            else {
                returnMessage = response.data.Message;
            }
            return ($q.reject(returnMessage));
        }

        function handleSuccess(response) {
            return response.data;
        }

    }
})();