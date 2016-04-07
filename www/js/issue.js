angular.module('citizen-engagement.issue', [])
    .factory('Map', function(geolocation) {
      return {
          'mapIssue': 
              geolocation.getLocation().then(function (data) {
                  return data.coords;
              }, function (error) {
                  console.log(error);
              })
      }
    })
    
  .controller('IssueCtrl', function($scope, $state, Map,  uiGmapGoogleMapApi, $q, issuesInRadius) {
      $q.all([
          Map.mapIssue,
          uiGmapGoogleMapApi
          ]).then(function(results) {
              $scope.markers = [];
              $scope.map = { center: { latitude: results[0].latitude, longitude: results[0].longitude }, zoom: 14 };
              
              //First marker, location of the user
              $scope.markers.push({
                  id: 0,
                  latitude: results[0].latitude,
                  longitude: results[0].longitude,
                  title: { title: 'Me'},
                  show: false
              })

              angular.forEach(issuesInRadius.data, function(value, key) {
                  $scope.markers.push({
                      id: value.id,
                      latitude: value.lat,
                      longitude: value.lng,
                      //title: value.description,
                      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                      show: false,
                      title: { title: value.description, picture: value.imageUrl}
                  })
              });
          }, function(error) {
              console.log(error);
      });

      $scope.onClick = function(marker, eventName, model) {
          model.show = !model.show;
      };

      // Add the register function to the scope.
      $scope.issuesList = function() {
          // Go to the issue creation tab.
          $state.go('tab.issues/issuesList');
      };

      $scope.newIssue = function() {
          // Go to the issue creation tab.
          $state.go('tab.issues/newIssue');
      };
  })

  .controller('IssueListCtrl', function(issuesList, $scope, $state) {

    // Add the register function to the scope.

      $scope.issuesList=issuesList.data;
      //console.log(issuesList.data);


      //   $http({
      //   method: 'GET',
      //   url: //trouver comment avoir la position //apiUrl + '/users/logister',
      // }).success(function(user) {

      //   // If successful, write lat et long

      //   // Go to the issue creation tab.
      //   $state.go('tab.issues');

      // }).error(function() {
      //   $scope.error = 'Could not have the lat and long';
      // });


        // Go to the issue creation tab.

  })

  .controller('NewIssueCtrl', function($scope, $state) {

    $scope.newIssue = function() {

    // // Take the long lati
    //   $http({
    //     method: 'GET',
    //     url: //trouver comment avoir la position //apiUrl + '/users/logister',
    //     data: //$scope.user
    //   }).success(function(user) {

    //     // If successful, write lat et long

    //     // Go to the issue creation tab.
    //     $state.go('tab.issues');

    //   }).error(function() {
    //     $scope.error = 'Could not have the lat and long';
    //   });


        // Go to the issue creation tab.
        $state.go('tab.issues/newIssue');
    };

  })

   .controller('IssueDetailCtrl', function(issueDetails, $scope, $state) {

        $scope.issueDetails = issueDetails.data;
        console.log(issueDetails.data);


      // // Go to the issue detail page
      //   $state.go('tab.issues/issueDetails');

    })


  
;
 