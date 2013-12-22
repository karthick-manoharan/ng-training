"use strict";

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngResource', 'md5']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when("/home", {
    templateUrl:"partials/list.html"
  })
  .when("/intro", {
    templateUrl:"partials/intro.html"
  })
  .when("/example/data-binding", {
    templateUrl:"partials/data-binding.html"
  })
  .when("/example/search", {
    templateUrl:"partials/search.html"
  })
  .when("/example/table-sort", {
    templateUrl:"partials/table-sort.html"
  })
  .when("/example/list", {
    templateUrl:"partials/listing.html"
  })
  .when("/example/filters", {
    templateUrl:"partials/filters.html"
  })
  .when("/example/http", {
    templateUrl:"partials/http.html"
  })
  .when("/example/directives", {
    templateUrl:"partials/directives.html"
  })
  .otherwise({
    redirectTo:'/home'
  });

  $locationProvider.hashPrefix('!');
}]);

app.run(['$rootScope', '$route','$location', function($rootScope, $route, $location){

	console.log("RUN...");

}]);

app.controller('IntroController', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.list = [
    { desc: 'Less Code'},
    { desc: 'Easy to Maintain'},
    { desc: 'Structure'},
    { desc: 'Compatibility'},
    { desc: 'Reusability'},
    { desc: 'Data Binding'},
    { desc: 'Dependency Injection'},
    { desc: 'Directives'},
  ]
}]);


app.controller('SearchController', ['$scope', '$rootScope', function($scope, $rootScope){

  console.log('SearchController...');

  $scope.projectList = ['Angular.js', 'Backbone.js', 'Ember.js', 'Knockout.js', 'jQuery.js', 'Modernizr.js', 'Bootstrap.js', 'Moment.js', 'Durandal.js', 'Parse.js', 'Igor Minar', 'Brad Green', 'Dave Geddes', 'Naomi Black', 'Greg Weber', 'Dean Sofer', 'Wes Alvaro', 'John Scott', 'Daniel Nadasi'];

}]);

app.controller('TableController', ['$scope', '$rootScope', function($scope, $rootScope) {
   $scope.departments =
    [{name:'HTML', phone:'123123', head:'Yaapa'},
     {name:'Android', phone:'4283974', head:'Amal'},
     {name:'iOS', phone:'947293', head:'Sid'},
     {name:'PHP', phone:'2344232', head: 'Hareesh'},
     {name:'RoR', phone:'2344232', head: 'Marcin'},
     {name:'HR', phone:'98742934', head:'Vidushi'}];

    $scope.predicate = 'name';
}]);

app.controller('ListingController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.names = ['Angular', 'Bootstrap', 'jQuery'];

  $scope.print = function() {
    console.log('names = ', $scope.names);
  };

}]);


app.controller('ListController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$scope.menu = [
    { name: 'Intro', link: 'intro' },
		{ name: 'Data Binding', link: 'example/data-binding' },
		{ name: 'Search', link: 'example/search' },
    { name: 'Table Sort', link: 'example/table-sort' },
    { name: 'List', link: 'example/list' },
    { name: 'Filters', link: 'example/filters' },
    { name: 'HTTP', link: 'example/http' },
    { name: 'Directives', link: 'example/directives' }
	];
}])

app.controller('APIController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $http({
    method: 'GET', 
    url: "http://api.feedzilla.com/v1/cultures.json", 
  })
  .success(function(data, status) {  
    console.log('data =', data);
    $scope.cultures = data;
  })
  .error(function(data, status) { 

  });   

}]);

app.filter('reverse', function(){
  return function (input) {
    return input ? input.split('').reverse().join('') : '';
  };
});

app.directive('getName', ['$location','$rootScope',function($location,$rootScope){
  return {
    // called in an attribute
    restrict: 'A',
    link: function(scope, element, attrs){ 
      console.log("attrs", attrs.ngController);
      $rootScope.currentController = attrs.ngController;
    }
  };
}]);

app.controller('GravatarController', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.getGravatar = function(email) {
    console.log('EMAIL === ', email);
    $scope.fromURL = email;
  };

  $scope.fromURL = "asavu@apache.org";
}]);

app.directive('gravatarImage', ['gravatarImageService', function (gravatarImageService) {
  return {
    restrict:"A",
    link:function (scope, elm, attrs) {
      // by default the values will come in as undefined so we need to setup a
      // watch to notify us when the value changes
      attrs.$observe('gravatarImage', function(value){
        console.log('value == ',value);
        // let's do nothing if the value comes in empty, null or undefined
        if ((value !== null) && (value !== undefined) && (value !== '') && (null != value.match(/.*@.*\..{2}/))) {
          // parse the size attribute
          var size = attrs.gravatarSize || 100;
          // parse the ratings attribute
          var rating = attrs.gravatarRating || 'pg';
          // parse the default image url
          var defaultUrl = attrs.gravatarDefault || '';
          // parse css class
          var cssClass = attrs.gravatarCssClass || 'gravatar-icon';
          // get image src from service
          var src = gravatarImageService.getImageSrc(value, size, rating, defaultUrl, attrs.gravatarSecure);
          // construct the tag to insert into the element
          var tag = '<img class="' + cssClass + '" src="' + src + '" >';
          //remove any existing imgs 
          elm.find('img').remove();
          // insert the tag into the element
          elm.append(tag);
        }
      });
    }};
}]);

app.factory('gravatarImageService', function (md5) {
    return {
        getImageSrc : function(value, size, rating, defaultUrl, secure) {
            // convert the value to lower case and then to a md5 hash
            var hash = md5.createHash(value.toLowerCase());
            var src = (secure ? 'https://secure' : 'http://www' ) + '.gravatar.com/avatar/' + hash + '?s=' + size + '&r=' + rating + '&d=' + defaultUrl;
            console.log('returning ...', src);
            return src;
        }
    };
});

