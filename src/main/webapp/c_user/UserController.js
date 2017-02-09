'use strict';

app.factory('User', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/user/:id', {id: '@id'},
	{
		updateUser: {method: 'PUT'}
	}
    );
}]);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.controller('UserController', ['$http','$scope','$cookieStore','User','UserService','$location','$rootScope',function($http,$scope,$cookieStore,User, UserService,$location, $rootScope)  {
	var self = this;
    self.users=[];
    self.user = new User(); 
   self.fetchAllUsers = function(){
          	UserService.fetchAllUsers().then(function(d){
   				self.users = d;
   			},function(errResponse){
   				console.error('Error while fetching users');
    	});
    };     
self.getSelectedUser = myProfile
    
    function myProfile(){
        console.log("MyProfile...")
        UserService.myProfile($rootScope.currentUser.id).then(function(d){
				self.user = d;
				console.log("User Id ="+self.user.id);
				$location.path("/myProfile");
			},function(errResponse){
				console.error('Error while fetch profile');
	});
};
self.createUser = function()
{
var file = $scope.myFile;
var name=$scope.name;
var email=$scope.email;
var address=$scope.address;
var mobile=$scope.mobile;
var role=$scope.role;
var username=$scope.username;
var password=$scope.password;
var file = $scope.myFile
/* console.log('file is ' );
console.dir(file);*/
var uploadUrl = "http://localhost:8070/Qeep/user";
var fd = new FormData();
fd.append('file', file);
fd.append('name', name);
fd.append('email', email);
fd.append('address', address);
fd.append('mobile', mobile);
fd.append('username', username);
fd.append('password', password);

console.log('Scope of user'+$scope.user);
$http.post(uploadUrl, fd, {
transformRequest : angular.identity,
headers : {
'Content-Type' : undefined
}
}).success(function() {
console.log('success');
}).error(function() {
console.log('error');
});
}
    	
    self.updateUserDetail = function(){
    	console.log('Inside update');
    	if($scope.userForm.$valid) {
        	   self.user.$updateUser(function(user){
        		console.log(user); 
    		self.updatedId = user.id;
    		self.reset();
    		self.flag = 'updated'; 
        		self.fetchAllUsers();
               });
    	}
        };

   self.deleteUser = function(identity){
       var user = User.get({id:identity}, function() {
            user.$delete(function(){
                console.log('Deleting user with id ', identity);
                self.fetchAllUsers();
            });
       });
    };

    self.fetchAllUsers();

    self.submit = function() {
        if(self.user.id==null){
            console.log('Saving New User', self.user);    
            self.createUser();
        }else{
            console.log('Updating user with id ', self.user.id);
            self.updateUser();
            console.log('User updated with id ', self.user.id);
        }
        self.reset();
    };
         
    self.edit = function(id){
    	 console.log('Inside edit');
         self.user = User.get({ id: id}, function() {
	       self.flag = 'edit'; 
	    });
         
    };
         
    self.remove = function(id){
        console.log('id to be deleted', id);
        if(self.user.id === id) {//If it is the one shown on screen, reset screen
           self.reset();
        }
        self.deleteUser(id);
    };

     
   self.reset = function(){
        self.user= new User();
        $scope.myForm.$setPristine(); //reset Form
    };
    
    self.login= function (){
    	{
    	console.log('Login Validation????????', self.user);
    	
    	self.authenticate(self.user);
    	
    	
    }
    };
    self.logout = function(){
    	$rootScope.currentUser = {};
    	$cookieStore.remove('currentUser');

    	console.log('calling the method logout of user service');
    	UserService.logout()
    	document.location.reload(true);
    	$location.path('/');
    	 
    };


    self.authenticate = function(user){
    	console.log("authenticate...")
    	UserService
    	.authenticate(user)
    	.then(
    			function(d){
    				self.user=d;
    				console.log("user.errorCode:"+self.user.errorCode)
    				if(self.user.errorCode== "404")
    					{
    					alert("Invalid Credentials.Please try again")
    					self.user.username="";
    					self.user.password="";
    					}
    				else{
    					console.log("Valid creditials.Navigating to index page")
    					$rootScope.currentUser={
    						username:self.user.username,
    						id:self.user.id,
    						role:self.user.role
    					};
    					$http.defaults.headers.common['Authorization']= 'Basic'+$rootScope.currentUser;
    					$cookieStore.put(
    								'currentUser',$rootScope.currentUser);
    					/*document.location.reload(true);*/
    					$location.path('/')
    				}
    			},
    			function(errResponse){
    				console.err('Error while authenticate Users');
    			});
    	 
    }
   

}]);