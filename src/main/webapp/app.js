'use strict';
var app=angular.module('app',['ngRoute','ngResource','ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	
     .when('/', {
         controller: 'HomeController',
         templateUrl: 'c_home/home.html',
         
     })
     .when('/aboutus', {
		controller : 'UserController',
		templateUrl : 'c_aboutus/aboutus.html'

	})

     .when('/login', {
         controller: 'UserController',
         templateUrl:  'c_user/login.html'
         
     })
     
     
     .when('/blog', {
    	 
         controller: 'BlogController',
         controller: 'BlogCommentController',
         controller: 'BlogLikeController',
         templateUrl: 'c_blog/blog.html',
         
        
     })
     
     
     .when('/forum', {
         controller: 'ForumController',
         controller: 'ForumCommentController',
         controller: 'ForumLikeController',
         templateUrl: 'c_forum/forum.html',
        
     })
     .when('/myProfile', {
		controller : 'UserController',
		templateUrl : 'c_user/myProfile.html'
	})
    .when('/friend', {
		controller : 'FriendController',
		templateUrl : 'c_friend/viewfriend.html'
	})

	.when('/friendrequest', {
		controller : 'FriendController',
		templateUrl : 'c_friend/friend.html'
	})
     .when('/userinfo', {
                controller: 'UserController',
                templateUrl: 'c_user/userinfo.html'
            })
      .when('/userlist', {
                controller: 'UserController',
                templateUrl: 'c_user/userlisthtml'
            })
     
     .when('/chat', {
         controller: 'ChatController',
         templateUrl: 'c_chat/chat.html',
        
     })
	.when('/chatforum', {
		controller : 'ChatForumController',
		templateUrl : 'c_chatForum/chatforum.html'
	})
	.when('/pose_job', {
         controller: 'JobController',
         templateUrl: 'c_job/pose_job.html',
        
     })
     .when('/search_job', {
         controller: 'JobController',
         templateUrl: 'c_job/search_job.html',
        
     })
     .when('/view-job', {
         controller: 'JobController',
         templateUrl: 'c_job/view-job.html',
        
     })
    .when('/view-job-details', {
         controller: 'JobController',
         templateUrl: 'c_job/view-job-details.html',
        
     })
     .when('/event', {
         controller: 'EventController',
         templateUrl: 'c_event/event.html',
        
     })

     
     .otherwise({ redirectTo: '/' });
})
app.run(function($rootScope, $location, $cookieStore, $http) {

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		// redirect to login page if not logged in and trying to access a restricted page
		var restrictedPage = $.inArray($location.path(), [ '/login','/blogList','/aboutus' ]) === -1;
		console.log("restrictedPage:" + restrictedPage)
		var loggedIn = $rootScope.currentUser.id;
		console.log("loggedIn:" + loggedIn)
		if (!loggedIn) {
			if (restrictedPage) {
				console.log("Navigating to login page")
				$location.path('/login');
			}
		} else {
			var role = $rootScope.currentUser.role;
			var userRestrictedPage = $.inArray($location.path(),
					[ '/userlist' ]) == 0;

			if (userRestrictedPage && role != 'admin') {
				alert("You can not do this operation as you are logged as :"
						+ role);
				$location.path('/');
			}
		}

	});

	// keep user logged in after page refresh
	$rootScope.currentUser = $cookieStore.get('currentUser') || {};
	if ($rootScope.currentUser) {
		$http.defaults.headers.common['Authorization'] = 'Basic '
				+ $rootScope.currentUser;
	}
});