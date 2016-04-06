angular.module('citizen-engagement.issuet', [])  
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
;
