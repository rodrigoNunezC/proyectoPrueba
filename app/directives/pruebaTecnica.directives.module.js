(function () {
    'use strict';

    angular
        .module('pruebaTecnica.directives', [])
        .directive('paginationPager', paginationPager)
    ;

    paginationPager.$inject = ['$parse'];
    function paginationPager($parse) {
        var _controller = function ($scope, $attrs) {
            var dvmpg = this;
            dvmpg.pager = {};
            dvmpg.detalle = [];

            if ($attrs.items)
                dvmpg.items = $parse($attrs.items)($scope)

            dvmpg.setPage = function (page) {
                dvmpg.pager = {};
                if (page < 1 || page > dvmpg.pager.totalPages) {
                    dvmpg.detalle = [];
                    return;
                }

                var pageSize = 12;
                if ($attrs.pageSize)
                    pageSize = $parse($attrs.pageSize)($scope);

                // get pager object from service
                dvmpg.pager = GetPager(dvmpg.items.length, page, pageSize);
                // get current page of items

                dvmpg.detalle = dvmpg.items.slice(dvmpg.pager.startIndex, dvmpg.pager.endIndex + 1);
                //scope.vm.remesasSinAprobar = dvmpg.todisplay;
                if ($attrs.todisplay) {
                    $parse($attrs.todisplay).assign($scope, dvmpg.detalle)
                }

            }

            $scope.$watch($attrs.items, function () {
                dvmpg.items = $parse($attrs.items)($scope);
                dvmpg.setPage(1);
            });

            function GetPager(totalItems, currentPage, pageSize) {
                // default to first page
                currentPage = currentPage || 1;

                // default page size is 10
                pageSize = pageSize || 10;

                // calculate total pages
                var totalPages = Math.ceil(totalItems / pageSize);

                var startPage, endPage;
                if (totalPages <= 10) {
                    // less than 10 total pages so show all
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    // more than 10 total pages so calculate start and end pages
                    if (currentPage <= 6) {
                        startPage = 1;
                        endPage = 10;
                    } else if (currentPage + 4 >= totalPages) {
                        startPage = totalPages - 9;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - 5;
                        endPage = currentPage + 4;
                    }
                }

                // calculate start and end item indexes
                var startIndex = (currentPage - 1) * pageSize;
                var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

                // create an array of pages to ng-repeat in the pager control
                //var pages = _.range(startPage, endPage + 1);
                var pages = [];
                for (var i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                // return object with all pager properties required by the view
                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            }

            dvmpg.setPage(1);

        }

        var _link = function (scope, elem, attrs) {
            scope.attrs = attrs;
        };

        return {
            restrict: 'EA',
            scope: true,
            link: _link,
            controller: _controller,
            controllerAs: 'dvmpg',
            bindToController: true,
            templateUrl: 'app/directives/templates/pager.html'
        };
    }
    
    

})();
