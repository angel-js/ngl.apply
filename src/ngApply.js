angular.module('ngApply', [])

.factory('ngApply', function () {
    'use strict';

    var ngApply = function (scope, transaction) {
        return function () {
            var args = [].slice.call(arguments);

            scope.$apply(function () {
                transaction.apply(null, args);
            });
        };
    };

    return ngApply;
});
