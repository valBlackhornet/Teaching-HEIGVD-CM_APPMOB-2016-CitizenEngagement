// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('citizen-engagement', ['ionic', 'citizen-engagement.auth', 'citizen-engagement.constants', 'citizen-engagement.issue'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function(AuthService, $rootScope, $state) {

  // Listen for the $stateChangeStart event of AngularUI Router.
  // This event indicates that we are transitioning to a new state.
  // We have the possibility to cancel the transition in the callback function.
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    // If the user is not logged in and is trying to access another state than "login"...
    if (!AuthService.currentUserId && toState.name != 'login') {

      // ... then cancel the transition and go to the "login" state instead.
      event.preventDefault();
      $state.go('login');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  //Delete the previous title
  $ionicConfigProvider.backButton.previousTitleText(false);
  //Delete the default text
  $ionicConfigProvider.backButton.text('');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // This is the abstract state for the tabs directive.
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: ''
        }
      }
    })

  .state('tab.issues', {
      cache: false,
      url: '/issues',
      views: {
        'tab-issues': {
          templateUrl: 'templates/tab-issues.html',
          resolve: {
            issuesInRadius: function($http, apiUrl, AuthService){
              return $http({
                method: 'GET',
                url: apiUrl + '/issues'
              }).success(function(issues) {
                return issues;
              });
            }
          },
          controller: 'IssueCtrl'
        }
      }
    })

    .state('tab.issues/issuesList', {
      url: '/issue/list',
      views: {  
        'tab-issues' : {
          templateUrl: 'templates/issueList.html',
          controller: ''
        }
      }
    })

    .state('tab.issues/newIssue', {
      url: '/issue/list',
      views: {  
        'tab-issues' : {
          templateUrl: 'templates/newIssue.html',
          controller: ''
        }
      }
    })

    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
    })
    ;

  // Define the default state (i.e. the first screen displayed when the app opens).
  $urlRouterProvider.otherwise(function($injector) {
    $injector.get('$state').go('tab.profile'); // Go to the new issue tab by default.
  });
})
