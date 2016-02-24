angular.module('ngl.apply', [])

.factory('nglApply', function () {
    'use strict';

    var nglApply = function (scope, transaction) {
        return function () {
            var args = [].slice.call(arguments);

            scope.$apply(function () {
                transaction.apply(null, args);
            });
        };
    };

    return nglApply;
});
