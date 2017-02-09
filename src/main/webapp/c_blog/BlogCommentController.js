'use strict';
/*var app = angular.module('myApp', ['ngResource']);*/
app.factory('BlogComment', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/blogcomment/:blogCommentId', {blogCommentId: '@blogCommentId'},
	{
		updateBlogComment: {method: 'PUT'}
	}
    );
}]);
app.controller('BlogCommentController', ['$scope', 'BlogComment', function($scope, BlogComment) {
    var ob = this;
    ob.blogComments=[];
    ob.blogComment = new BlogComment(); 
    ob.fetchAllBlogComments = function(){
        ob.blogComments = BlogComment.query();
    };
    ob.fetchAllBlogComments();
    ob.createBlogComment = function(){
        ob.blogComment.$save(function(blogComment){
        	ob.flag= 'created';	
   	        ob.reset();	
            ob.fetchAllBlogComments();
        });
    };
    ob.edit = function(blogCommentId){
      	 console.log('Inside edit');
           ob.blogComment = BlogComment.get({ blogCommentId: blogCommentId}, function() {
   	       ob.flag = 'edit'; 
   	    });
           
      };    
       ob.updateBlogCommentDetail = function(){
   	console.log('Inside update');
   	if($scope.blogCommentForm.$valid) {
       	   ob.blogComment.$updateBlogComment(function(blogComment){
       		console.log(blogComment); 
   		ob.updatedId = blogComment.blogCommentId;
   		ob.reset();
   		ob.flag = 'updated'; 
       		ob.fetchAllBlogComments();
              });
   	}
       };	
       ob.deleteBlogComment = function(identity){
           var blogComment = BlogComment.get({blogCommentId:identity}, function() {
        	   blogComment.$delete(function(){
                    console.log('Deleting blogComment with blogCommentId ', identity);
                    ob.fetchAllBlogComments();
                });
           });
        };			
       ob.reset = function(){
       	ob.blogComment = new BlogComment();
           $scope.blogCommentForm.$setPristine();
       };	
       ob.cancelUpdate = function(blogCommentId){
   	    ob.blogComment = new BlogComment();
   	    ob.flag= '';	
      	    ob.fetchAllBlogComments();
       };    
    
}]);     