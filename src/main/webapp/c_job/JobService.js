'use strict';

  app.factory('JobService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope)
                   
   {
	console.log("JobService....")
	
	var BASE_URL="http://localhost:8070/Qeep";
		return{
		
		applyForJob: function(jobID) {
			return $http.post(BASE_URL+"/applyForJob/"+jobID)
			.then(
				function(response){
					return response.data;
				},
				function(errResponse){
					console.error('Error while applying for job');
					return $q.reject(errResponse);
				}
				);
			},
	
			
			accept: function(jobapplied,id){
				console.log("accepting in service")
				return $http.put(BASE_URL+'/jobaccept/'+jobapplied.id,jobapplied)
				.then(
						function(response){
							return response.data;
						},
						function(errResponse){
							console.error('Error while updating jobapplied');
							return $q.reject(errResponse);
						});
			},	
			
			reject: function(jobapplied,id){
				console.log("rejecting in service")
				return $http.put(BASE_URL+'/jobreject/'+jobapplied.id,jobapplied)
				.then(
						function(response){
							return response.data;
						},
						function(errResponse){
							console.error('Error while updating jobapplied');
							return $q.reject(errResponse);
						});
			},	
			
	
	getJobDetails: function(jobID){
		console.log("Getting job details of" + jobID)
		return $http.get(BASE_URL+"/getJobDetails/"+jobID)
		.then(
				function(response){
					$rootScope.selectedJob = response.data
					return response.data;
				},
		function(errResponse){
					console.error('Error while getting job details');
					return $q.reject(errResponse);
				}		
		);
	},
	
	getMyAppliedJobs: function(){
		return $http.get(BASE_URL+'/getMyAppliedJobs/')
		.then(
				function(response){
					return response.data;
				},
				function(errResponse){
					console.error('Error while getting applied jobs');
					return $q.reject(errResponse);
				});
	},
	
      postAJob: function(job){
    	  return $http.post(BASE_URL+'/postAJob/',job)
    	  .then(
    			  function(response){
    				  return response.data;
    			  },
    			  function(errResponse){
    				  console.error('Error while posting job');
    				  return $q.reject(errResponse);
    			  });
      },  
      
      rejectJobApplication: function(userID, jobID){
    	  return $http.put(BASE_URL+'/rejectJobApplication/'+userID, jobID)
    	  .then(
    			  function(response){
    				  return response.data;
    			  },
    			  function(errResponse){
    				  console.error('Error while updating friend');
    			  });
      },
      
      canCallForInterview: function(id){
    	  return $http.put(BASE_URL+'/canCallForInterview/'+userID,id)
    	  .then(function(response){
			  return response.data;
		  },
		  function(errResponse){
			  console.error('Error while updating friend');
		  }
    			  );
      },
      
      selectUser: function(id){
    	  return $http.put(BASE_URL+'/selectUser/'+userID, jobID)
    	  .then(
    			  function(response){
    				  return response.data;
    			  },
    			  function(errResponse){
    				  console.error('Error while selected User');
    				  return $q.reject(errResponse);
    			  });
      },
      
      getAllJobs: function(){
    	  return $http.get(BASE_URL+'/getAllJobs/')
    	  .then(
    			  function(response){
    				  return response.data;
    			  },
    			  function(errResponse){
    				  console.error('Error while getting all jobs');
    				  return $q.reject(errResponse);
    			  });
      },  

      getAllJobsApplied: function(){
    	  return $http.get(BASE_URL+'/getAllJobsApplication/')
    	  .then(
    			  function(response){
    				  return response.data;
    			  },
    			  function(errResponse){
    				  console.error('Error while getting all jobsapplied');
    				  return $q.reject(errResponse);
    			  });
      },  
      
	};	
	}])
