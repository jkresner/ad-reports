angular.module("Media", ['ngRoute'])


.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {

  $locationProvider.html5Mode(true)

  $routeProvider
    .when('/campaigns', {controller: 'campaigns', templateUrl: '/campaigns.html'})
    .when('/impressions', {controller: 'impressions', templateUrl: '/impressions.html'})
    .when('/roi', {controller: 'roi', templateUrl: '/roi.html'})

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

    if (!error) error = function(e) { alert(e) }
    $http[method].apply(null, httpArgs).success(success).error(error)
  }

}])


.directive('adImg', function() {
  return {
    template: '<img ng-src="{{url}}" class="ad ad{{width}}" /><pre><a ng-url="">{{dest}}</a></pre>',
    scope: { url: '=url', width: '=width', dest: '=dest', }
  }
})

.directive('urlLink', function() {
  return {
    template: '<a href="https://www.{{c.url}}" target="_blank">{{c.text||c.url.replace("airpair.com","")}}</a>',
    scope: { c: '=c' }
  }
})


.controller('campaigns', ["$scope", "API", function($scope, API) {

  API("/campaigns", function(r) { $scope.campaigns = r })

}])


.controller('impressions', ["$scope", "API", function($scope, API) {

  $scope.data = {
    s: '20160425',
    // s: 'select',
    c: '56f9781c7365645894420ae7'

  }

  $scope.refresh = function() {
    if ($scope.data.s == 'select') return
    var query = $scope.data.c + "?s="+$scope.data.s

    API("/report/impressions/"+query, function(r) {
      $scope.report = r
      $scope.impressions = 0
      r.ads.forEach(ad => $scope.impressions += ad.total.impressions)
    })
  }

  $scope.refresh()
}])


.controller('roi', ["$scope", "API", function($scope, API) {
   $scope.campaigns = {
      "Q2": {
        name: "2016 Q2 Heroku Signup",
        short: "Q2"
      }
   }
  // $scope.data = { s: 'select', c: '56f9781c7365645894420ae7' }

  // $scope.refresh = function() {
    // if ($scope.data.s == 'select') return
    // var query = $scope.data.c + "?s="+$scope.data.s

    // API("/report/impressions/"+query, function(r) {
      // $scope.report = r
    // }, () => {})

  // }

}])


