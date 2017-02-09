'use strict';

app.factory('Blog', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/blog/:c_id', {c_id: '@c_id'},
	{
		updateBlog: {method: 'PUT'}
	}
    );
}]);
app.controller('BlogController', ['$scope', 'Blog', function($scope, Blog) {
    var ob = this;
    ob.blogs=[];
    ob.blog = new Blog(); 
    ob.fetchAllBlogs = function(){
        ob.blogs = Blog.query();
    };
    ob.fetchAllBlogs();
    ob.createBlog = function(){
        ob.blog.$save(function(){
        	ob.flag= 'created';	
   	        ob.reset();	
            ob.fetchAllBlogs();
        });
    };
    ob.edit = function(c_id){
   	 console.log('Inside edit');
        ob.blog = Blog.get({ c_id: c_id}, function() {
	       ob.flag = 'edit'; 
	    });
        
   };    
    ob.updateBlogDetail = function(){
	console.log('Inside update');
	if($scope.blogForm.$valid) {
    	   ob.blog.$updateBlog(function(blog){
    		console.log(blog); 
		ob.updatedId = blog.c_id;
		ob.reset();
		ob.flag = 'updated'; 
    		ob.fetchAllBlogs();
           });
	}
    };
    ob.viewBlog = function(c_id){
      	 console.log('Inside view');
           ob.viewblogs = Blog.get({ c_id: c_id}, function() {
   	       ob.flag = 'view'; 
   	    });
           
      };  
    ob.deleteBlog = function(identity){
        var blog = Blog.get({c_id:identity}, function() {
             blog.$delete(function(){
                 console.log('Deleting blog with c_id ', identity);
                 ob.fetchAllBlogs();
             });
        });
     };	
     
    ob.reset = function(){
    	ob.blog = new Blog();
        $scope.blogForm.$setPristine();
    };	
    ob.cancelUpdate = function(c_id){
	    ob.blog = new Blog();
	    ob.flag= '';	
   	    ob.fetchAllBlogs();
    };    
}]);     