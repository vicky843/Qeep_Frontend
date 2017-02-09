'use strict';
/*var app = angular.module('myApp', ['ngResource']);*/
app.factory('BlogLike', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/bloglike/:bLikeId', {bLikeId: '@bLikeId'},
	{
		updateBlogLike: {method: 'PUT'}
	}
    );
}]);
app.controller('BlogLikeController', ['$scope', 'BlogLike', function($scope, BlogLike) {
    var ob = this;
    ob.blogLikes=[];
    ob.blogLike = new BlogLike(); 
    ob.fetchAllBlogLikes = function(){
        ob.blogLikes = BlogLike.query();
    };
    ob.fetchAllBlogLikes();
    ob.createBlogLike = function(){
        ob.blogLike.$save(function(blogLike){
        	ob.flag= 'created';	
   	        ob.reset();	
            ob.fetchAllBlogLikes();
        });
    };
    ob.edit = function(bLikeId){
      	 console.log('Inside edit');
           ob.blogLike = BlogLike.get({ bLikeId: bLikeId}, function() {
   	       ob.flag = 'edit'; 
   	    });
           
      };    
       ob.updateBlogLikeDetail = function(){
   	console.log('Inside update');
   	if($scope.blogLikeForm.$valid) {
       	   ob.blogLike.$updateBlogLike(function(blogLike){
       		console.log(blogLike); 
   		ob.updatedId = blogLike.bLikeId;
   		ob.reset();
   		ob.flag = 'updated'; 
       		ob.fetchAllBlogLikes();
              });
   	}
       };	
       ob.deleteBlogLike = function(identity){
           var blogLike = BlogLike.get({blogLike:identity}, function() {
                blogLike.$delete(function(){
                    console.log('Deleting blogLike with blogLike ', identity);
                    ob.fetchAllBlogLikes();
                });
           });
        };		
       ob.reset = function(){
       	ob.blogLike = new BlogLike();
           $scope.blogLikeForm.$setPristine();
       };	
       ob.cancelUpdate = function(bLikeId){
   	    ob.blogLike = new BlogLike();
   	    ob.flag= '';	
      	    ob.fetchAllBlogLikes();
       };    
    
}]);     