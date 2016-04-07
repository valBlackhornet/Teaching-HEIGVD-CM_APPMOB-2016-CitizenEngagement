angular.module('citizen-engagement.issue', [])
    .factory('Map', function(geolocation, $q, uiGmapGoogleMapApi) {
      return {
          pos: 
              geolocation.getLocation().then(function (data) {
                  return data.coords;
              }, function (error) {
                  console.log(error);
              })
        }
      })
    
  .controller('IssueCtrl', function($scope, $state, Map,  uiGmapGoogleMapApi, $q, issuesInRadius) {
      $q.all([
          Map.pos,
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
      // Go to the issue detail page

  })

  .controller('NewIssueCtrl', function(issueInfos, $scope, $state, $ionicModal, Map) {
    $scope.issueTypes = issueInfos.issueTypes;
    var geocoder = new google.maps.Geocoder();
    
    var latLng = new google.maps.LatLng(issueInfos.coords.latitude, issueInfos.coords.longitude);
    geocoder.geocode({'latLng': latLng}, function(results, status){
      $scope.address = results[0].address_components[1].long_name + " " 
              + results[0].address_components[0].long_name;
      $scope.city = results[0].address_components[2].long_name != ""?results[0].address_components[2].long_name: "" + " " 
              + results[0].address_components[6].long_name;
      console.log($scope.address);
      $scope.lon =issueInfos.coords.longitude;
      $scope.lat =issueInfos.coords.latitude;
    });

    $scope.Geolocalise = function () {
      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        Map: Map,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.oMap = { center: { latitude: issueInfos.coords.latitude, longitude: issueInfos.coords.longitude }, zoom: 14 };
        $scope.oMap.events = {
          click: function (map, eventName, originalEventArgs) {
              var e = originalEventArgs[0];
              var lat = e.latLng.lat(),lon = e.latLng.lng();
              var marker = {
                  id: Date.now(),
                  coords: {
                      latitude: lat,
                      longitude: lon
                  }
              };
              $scope.$apply();

              geocoder.geocode({'latLng': e.latLng}, function(results, status){
                $scope.address = results[0].address_components[1].long_name + " " 
                        + results[0].address_components[0].long_name;
                $scope.city = results[0].address_components[2].long_name != ""?results[0].address_components[2].long_name: "" + " " 
                        + results[0].address_components[6].long_name;

                $scope.lon =issueInfos.coords.longitude;
                $scope.lat =issueInfos.coords.latitude;
              });
              $scope.oMap = null;
              $scope.modal.remove();
            }
        };
        console.log($scope);

        modal.show();
        $scope.closeModal = function () {

              $scope.oMap = null;
          $scope.modal.remove();
        };

      });
    };
  })

   .controller('IssueDetailCtrl', function(issueDetails, $scope, $state) {

        $scope.issueDetails = issueDetails.data;
        console.log(issueDetails.data);


      // // Go to the issue detail page
      //   $state.go('tab.issues/issueDetails');

    })


  
;
 