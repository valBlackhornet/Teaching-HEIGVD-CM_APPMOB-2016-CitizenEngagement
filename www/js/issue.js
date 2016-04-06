angular.module('citizen-engagement.issue', [])

  

  .controller('IssueCtrl', function($scope, $state) {

    // Add the register function to the scope.
    $scope.issuesList = function() {
        // Go to the issue c reation tab.
        $state.go('tab.issues/issuesList');
    };

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
;
 