angular.module('citizen-engagement.issue', [])
    .factory('Map', function($cordovaGeolocation, $q, uiGmapGoogleMapApi) {
      return {
          pos:
              $cordovaGeolocation.getCurrentPosition({
                enableHighAccuracy: true,
                maximumAge: 0
              }).then(function (position) {
                return position.coords;
              },function (error) {
                console.log(error);
              })
        }
      })

  .factory('CameraService', ['$q', function($q) {
    return {
      getPicture: function(options) {
        var q = $q.defer();
        
        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);
        
        return q.promise;
      }
    }
  }])

    
  .controller('IssueCtrl', function($scope, $state, Map,  uiGmapGoogleMapApi, $q, issuesInRadius, $cordovaGeolocation) {
      console.log(issuesInRadius.data);

      

      

          //jessamynsmith/ionic-angular
          var posOptions = {
            enableHighAccuracy: true,
            maximumAge: 0
          };
      $scope.$on('$ionicView.beforeEnter', function() {
          uiGmapGoogleMapApi.then(function() {
              $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

                $scope.markers = [];
                $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 14 };
                
                //First marker, location of the user
                $scope.markers.push({
                    id: 0,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
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
              },function (error) {
                console.log(error);
              });
          });
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

  .controller('NewIssueCtrl', function(issueInfos, apiUrl, qimgToken, $scope, $state, $ionicModal, CameraService, $http, qimgUrl) {
    $scope.issueTypes = issueInfos.issueTypes;    

    $scope.newIssue = {
      description: "",
      issueTypesId: $scope.issueTypes[0].id
    };

    var latLng = new google.maps.LatLng(issueInfos.coords.latitude, issueInfos.coords.longitude);
    var geocoder = new google.maps.Geocoder();
    $scope.test = function () {
      console.log('test');
    };

    $scope.getPhoto = function () {
      console.log('Getting camera');
      CameraService.getPicture({
        quality: 75,
        targetWidth: 400,
        targetHeight: 300,
        saveToPhotoAlbum: false,
        destinationType: Camera.DestinationType.DATA_URL
      }).then(function(imageURI) {
        $http({
          method: "POST",
          url: qimgUrl + "/images",
          headers: {
          Authorization: "Bearer " + qimgToken
          },
          data: {
          data: imageURI
          }
        }).success(function(data) {
          console.log("yop" + data.url);
          $scope.lastPhoto = imageURI;
          $scope.imageUrl = data.url;
          // do something with imageUrl
        }).error(function(error) {
          console.log(JSON.stringify(arguments));
        });
      }, function(err) {
        console.log(err);
      });
    };

    $scope.showSelectValue = function (mySelect) {
      console.log(mySelect);
      $scope.newIssue.issueTypesId = mySelect;
    };

    geocoder.geocode({'latLng': latLng}, function(results, status){
      $scope.$apply(function() {
        $scope.address = results[0].address_components[1].long_name + " " 
              + results[0].address_components[0].long_name;
        $scope.city = results[0].address_components[2].long_name != ""?results[0].address_components[2].long_name: "" + " " 
              + results[0].address_components[6].long_name;
        $scope.lon =issueInfos.coords.longitude;
        $scope.lat =issueInfos.coords.latitude;
      });
    });
    
    $scope.submit = function () {
      if ($scope.newIssue.description &&
          $scope.newIssue.issueTypesId &&
          $scope.lon &&
          $scope.lat &&
          $scope.imageUrl) {
        $http({
          method: "POST",
          url: apiUrl + "/issues",
          data: {
            "description": $scope.newIssue.description,
            "lng": $scope.lon,
            "lat": $scope.lat,
            "imageUrl": $scope.imageUrl,
            "issueTypeId": $scope.newIssue.issueTypesId
          }
        }).success(function(data) {
          $state.go('tab.issues/issuesList');
        }).error(function(error) {
          console.log(JSON.stringify(arguments));
        });
      } else {
        $scope.error = "All must be filling";
      };
    };

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
 