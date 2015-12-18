ng-apply
========

Wrapper to `$scope.$apply`

Usage
-----

When dealing with asynchronous flows outside of the angular lifecycle,
you need to call `$scope.$apply` to update the view if your `$scope` models have
changed

```js
angular.module('app', [])
.directive('counter', function () {
  return function link (scope, element, attrs) {
    element.on('click', function () {
      if (!scope.counter) { scope.counter = 0; }
      scope.counter += 1;
      scope.$apply();
    });
  };
});
```

It turns out that `$scope.$apply` accept a _"transaction"_ function argument
that can be used to make model mutations from there

This is the recommended way to use `$scope.$apply`

```js
angular.module('app', [])
.directive('counter', function () {
  return function link (scope, element, attrs) {
    element.on('click', function () {
      scope.$apply(function () {
        if (!scope.counter) { scope.counter = 0; }
        scope.counter += 1;
      });
    });
  };
});
```

`ng-apply` is a higher order function which gets the same _"transaction"_
argument and returns a function that invokes `$scope.$apply` when called

```js
angular.module('app', ['ng-apply'])
.directive('counter', function (ngApply) {
  return function link (scope, element, attrs) {
    element.on('click', ngApply(scope, function () {
      if (!scope.counter) { scope.counter = 0; }
      scope.counter += 1;
    }));
  };
});
```
