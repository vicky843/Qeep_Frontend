'use strict';
/*var app = angular.module('myApp', ['ngResource']);*/
app.factory('ForumComment', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/forumcomment/:forumCommentId', {forumCommentId: '@forumCommentId'},
	{
		updateForumComment: {method: 'PUT'}
	}
    );
}]);
app.controller('ForumCommentController', ['$scope', 'ForumComment', function($scope, ForumComment) {
    var ob = this;
    ob.forumComments=[];
    ob.forumComment = new ForumComment(); 
    ob.fetchAllForumComments = function(){
        ob.forumComments = ForumComment.query();
    };
    ob.fetchAllForumComments();
    ob.createForumComment = function(){
        ob.forumComment.$save(function(forumComment){
        	ob.flag= 'created';	
   	        ob.reset();	
            ob.fetchAllForumComments();
        });
    };
    ob.edit = function(forumCommentId){
      	 console.log('Inside edit');
           ob.forumComment = ForumComment.get({ forumCommentId: forumCommentId}, function() {
   	       ob.flag = 'edit'; 
   	    });
           
      };    
       ob.updateForumCommentDetail = function(){
   	console.log('Inside update');
   	if($scope.forumCommentForm.$valid) {
       	   ob.forumComment.$updateForumComment(function(forumComment){
       		console.log(forumComment); 
   		ob.updatedId = forumComment.forumCommentId;
   		ob.reset();
   		ob.flag = 'updated'; 
       		ob.fetchAllForumComments();
              });
   	}
       };	
       ob.deleteForumComment = function(identity){
           var forumComment = ForumComment.get({forumCommentId:identity}, function() {
                forumComment.$delete(function(){
                    console.log('Deleting forumComment with forumCommentId ', identity);
                    ob.fetchAllForumComments();
                });
           });
        };		
       ob.reset = function(){
       	ob.forumComment = new ForumComment();
           $scope.forumCommentForm.$setPristine();
       };	
       ob.cancelUpdate = function(forumCommentId){
   	    ob.forumComment = new ForumComment();
   	    ob.flag= '';	
      	    ob.fetchAllForumComments();
       };    
    
}]);     