angular.module('citizen-engagement.issue', [])  
    .controller('IssueCtrl', function($scope, $state, issuesInRadius, AuthService) {
        alert(issuesInRadius.data);
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
;
