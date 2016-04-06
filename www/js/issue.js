angular.module('citizen-engagement.issue', [])

.controller('IssueCtrl', function($scope, $state, issuesInRadius, AuthService) {
        function initialize () {
            var myLatlng = new google.maps.LatLng(0, 0);
            var mapOptions = {
                'center': myLatlng,
                'zoom': 13,
                'streetViewControl': false,
                'mapTypeControl': false,
                'panControl': false,  
                'mapTypeId': google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var infowindow = new google.maps.InfoWindow();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var myLatlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var marker = new google.maps.Marker({
                        'position': myLatlng,
                        'map': map,
                        'title': 'Issue map'
                    });

                    //Markers
                    //http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example

                    map.setCenter(myLatlng);
                }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }

        google.maps.event.addDomListener(window, 'load', initialize);
        ionic.Platform.ready(initialize); 

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
<<<<<<< HEAD

      $scope.issuesList=issuesList.data;
      console.log(issuesList.data);

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
=======
    $scope.issuesList = function() {
        // Go to the issue c reation tab.
>>>>>>> 4454534af13558801e4558373c7e181582d0a152
        $state.go('tab.issues/issuesList');

    })

  .controller('NewIssueCtrl', function(issuesList, $scope, $state) {

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

   .controller('IssueDetailCtrl', function(issuesList, $scope, $state) {
    $scope.issueDetail = function() {

      // Go to the issue detail page
        $state.go('tab.issues/issueDetail');

    }

      })


  
;
 