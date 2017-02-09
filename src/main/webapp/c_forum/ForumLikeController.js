'use strict';
/*var app = angular.module('myApp', ['ngResource']);*/
app.factory('ForumLike', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/forumlike/:fLikeId', {fLikeId: '@fLikeId'},
	{
		updateForumLike: {method: 'PUT'}
	}
    );
}]);
app.controller('ForumLikeController', ['$scope', 'ForumLike', function($scope, ForumLike) {
    var ob = this;
    ob.forumLikes=[];
    ob.forumLike = new ForumLike(); 
    ob.fetchAllForumLikes = function(){
        ob.forumLikes = ForumLike.query();
    };
    ob.fetchAllForumLikes();
    ob.createForumLike = function(){
        ob.forumLike.$save(function(forumLike){
        	ob.flag= 'created';	
   	        ob.reset();	
            ob.fetchAllForumLikes();
        });
    };
    ob.edit = function(fLikeId){
      	 console.log('Inside edit');
           ob.forumLike = ForumLike.get({ fLikeId: fLikeId}, function() {
   	       ob.flag = 'edit'; 
   	    });
           
      };    
       ob.updateForumLikeDetail = function(){
   	console.log('Inside update');
   	if($scope.forumLikeForm.$valid) {
       	   ob.forumLike.$updateForumLike(function(forumLike){
       		console.log(forumLike); 
   		ob.updatedId = forumLike.fLikeId;
   		ob.reset();
   		ob.flag = 'updated'; 
       		ob.fetchAllForumLikes();
              });
   	}
       };	
       ob.deleteForumLike = function(identity){
           var forumLike = ForumLike.get({forumLike:identity}, function() {
                forumLike.$delete(function(){
                    console.log('Deleting forumLike with forumLike ', identity);
                    ob.fetchAllForumLikes();
                });
           });
        };		
       ob.reset = function(){
       	ob.forumLike = new ForumLike();
           $scope.forumLikeForm.$setPristine();
       };	
       ob.cancelUpdate = function(fLikeId){
   	    ob.forumLike = new ForumLike();
   	    ob.flag= '';	
      	    ob.fetchAllForumLikes();
       };    
    
}]);     