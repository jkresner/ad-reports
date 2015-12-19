angular.module("Media", ['ngRoute'])


.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true)

  $routeProvider
    .when('/reports', {controller: 'reports', templateUrl: '/reports.html'})
    .when('/campaigns', {controller: 'campaigns', templateUrl: '/campaigns.html'})

}])


.service('API', ["$http", "$rootScope", function($http, $rootScope) {

  return function(url, data, success, error) {
    var method = 'get'

    if (data.constructor === Function)
    {
      error = success
      success = data
      data = undefined

    }
    else {
      if (url.match('/update') || data._id) {
        url = url.replace('update','')
        method = 'put'
      } else {
        method = 'post'
      }
    }

    var httpArgs = ['/api'+url]
    if (data)
      httpArgs.push(data)


    $http[method].apply(null, httpArgs).success(success).error(error)
  }

}])


.directive('adImg', function() {
  return {
    template: '<img ng-src="{{url}}" class="ad" />',
    scope: { url: '=url' }
  }
})


.controller('reports', ["$scope", "API", function($scope, API) {
  $scope.data = { s: 'select', c: '56731043c554f496b6e1e217' }

  $scope.refresh = function() {
    if ($scope.data.s == 'select') return
    var query = $scope.data.c + "?s="+$scope.data.s

    API("/report/campaign/"+query, function(r) {
      $scope.report = r
    }, () => {})

  }

}])


.controller('campaigns', ["$scope", "API", function($scope, API) {

  API("/campaigns", function(r) {
    $scope.campaigns = r
  }, () => {})

}])
