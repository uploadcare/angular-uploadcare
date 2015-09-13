'use strict';

/**
 * @ngdoc directive
 * @name angular-uploadcare.directive:Uploadcare
 * @description Provides a directive for the Uploadcare widget.
 * # Uploadcare
 */
angular.module('ng-uploadcare', [])
  .directive('uploadcareWidget', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        onWidgetReady: '&',
        onUploadComplete: '&',
        onChange: '&',
        ngModel: '='
      },
      controller: ['$scope', '$element', '$attrs', '$log', function($scope, $element, $attrs, $log) {
        if(!uploadcare) {
          $log.error('Uploadcare script has not been loaded!.');
          return;
        }
        $element.attr('type', 'hidden');
        $scope.widget = uploadcare.Widget($element);
        $scope.onWidgetReady({widget: $scope.widget});
        $scope.widget.onUploadComplete(function(info) {
          $scope.onUploadComplete({info: info});
        });
        $scope.widget.onChange(function(data) {
          // add data binding for hidden inputs
          if (data) {
            data.promise().done(function(info) {
              $scope.$apply(function () {
                $scope.ngModel = $element.val()
              });
            });
          }
          $scope.onChange({data: data});
        })
      }]
    };
  });
