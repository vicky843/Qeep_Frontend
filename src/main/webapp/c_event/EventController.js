'use strict';
/*var app = angular.module('myApp', ['ngResource']);*/
app.factory('Event', ['$resource', function ($resource) {
    return $resource('http://localhost:8070/Qeep/event/:c_id', {c_id: '@c_id'},
	{
		updateEvent: {method: 'PUT'}
	}
    );
}]);
app.controller('EventController', ['$scope', 'Event', function($scope, Event) {
    var ob = this;
    ob.events=[];
    ob.event = new Event(); 
    ob.fetchAllEvents = function(){
        ob.events = Event.query();
    };
    ob.fetchAllEvents();
    ob.createEvent = function(){
        ob.event.$save(function(){
        	ob.flag= 'created';	
   	        ob.reset();	
            ob.fetchAllEvents();
        });
    };
    ob.edit = function(c_id){
   	 console.log('Inside edit');
        ob.event = Event.get({ c_id: c_id}, function() {
	       ob.flag = 'edit'; 
	    });
        
   };    
    ob.updateEventDetail = function(){
	console.log('Inside update');
	if($scope.eventForm.$valid) {
    	   ob.event.$updateEvent(function(event){
    		console.log(event); 
		ob.updatedId = event.c_id;
		ob.reset();
		ob.flag = 'updated'; 
    		ob.fetchAllEvents();
           });
	}
    };	
    ob.deleteEvent = function(identity){
        var event = Event.get({c_id:identity}, function() {
             event.$delete(function(){
                 console.log('Deleting event with c_id ', identity);
                 ob.fetchAllEvents();
             });
        });
     };		
    ob.reset = function(){
    	ob.event = new Event();
        $scope.eventForm.$setPristine();
    };	
    ob.cancelUpdate = function(c_id){
	    ob.event = new Event();
	    ob.flag= '';	
   	    ob.fetchAllEvents();
    };    
}]);     