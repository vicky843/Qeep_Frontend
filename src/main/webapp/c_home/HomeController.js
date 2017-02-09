'use strict';
app.controller('HomeController',['$scope','UserService','$rootScope' ,function($scope,UserService,$rootScope){
	console.log("HomeController")
	var self=this;
	self.getCurrentUser= function()
	{
		console.log("Loading current user")
		console.log("Current user:"+$rootScope.currentUser)
		if(!$rootScope.currentUser)
			{
			console.log("Loading current user")
			$rootScope.currentUser="";
			}
		console.log("User is logged in")
		return $rootScope.currentUser;
	}
	self.getCurrentUser();
}])