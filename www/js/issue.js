angular.module('citizen-engagement.issue', [])

  

  .controller('IssueCtrl', function($scope, $state) {

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
