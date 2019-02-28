
(function () {
    'use strict';

    angular
        .module('pruebaTecnica')
        .config(config)
        .config(configureToastr);


    config.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];
    function config($routeProvider, $httpProvider, $locationProvider) {


        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


        $routeProvider

            .when('/', {
                
            })

            .when('/admin/usuarios', {
                templateUrl: 'app/views/administracion/usuario/usuario.html',
                controller: 'usuarioController',
                controllerAs: 'vm'

            })


            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.hashPrefix('');

        $httpProvider.interceptors.push(function ($q, $rootScope) {
            var numberOfHttpRequests = 0;
            return {
                request: function (config) {
                    numberOfHttpRequests += 1;
                    $rootScope.waitingForHttp = true;
                    return config;
                },
                requestError: function (error) {
                    numberOfHttpRequests -= 1;
                    $rootScope.waitingForHttp = (numberOfHttpRequests !== 0);
                    return $q.reject(error);
                },
                response: function (response) {
                    numberOfHttpRequests -= 1;
                    $rootScope.waitingForHttp = (numberOfHttpRequests !== 0);
                    return response;
                },
                responseError: function (error) {
                    numberOfHttpRequests -= 1;
                    $rootScope.waitingForHttp = (numberOfHttpRequests !== 0);
                    return $q.reject(error);
                }
            };
        });


        
    }

    function configureToastr(toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: true,
            maxOpened: 10,
            newestOnTop: true,
            //preventDuplicates: true,
            preventOpenDuplicates: false
            //positionClass: 'toast-top-center', //'toast-top-full-width'
            //target: 'body'
        });
    }
  
})();


