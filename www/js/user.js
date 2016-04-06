angular.module('citizen-engagement.user', [])

  

  .controller('UsersCtrl', function(user, $scope, $state) {

    $scope.user = user.data; //Returns {name: "Andrew"}
    

  })
;
 