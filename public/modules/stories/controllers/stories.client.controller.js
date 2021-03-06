'use strict';

// Stories controller
angular.module('stories').controller('StoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stories',
	function($scope, $stateParams, $location, Authentication, Stories ) {
		$scope.authentication = Authentication;

		// Create new Story
		$scope.create = function() {
			// Create new Story object
			var story = new Stories ({
				title: this.title,
                body: this.body,
                address: this.address,
                city: this.city,
                zipcode: this.zipcode
			});

			// Redirect after save
			story.$save(function(response) {
				$location.path('stories/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.title = '';
            this.body = '';
            this.address = '';
            this.city = '';
            this.zipcode = '';


		};

		// Remove existing Story
		$scope.remove = function( story ) {
			if ( story ) { story.$remove();

				for (var i in $scope.stories ) {
					if ($scope.stories [i] === story ) {
						$scope.stories.splice(i, 1);
					}
				}
			} else {
				$scope.story.$remove(function() {
					$location.path('stories');
				});
			}
		};

		// Update existing Story
		$scope.update = function() {
			var story = $scope.story ;

			story.$update(function() {
				$location.path('stories/' + story._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Stories
		$scope.find = function() {
			$scope.stories = Stories.query();
		};

		// Find existing Story
		$scope.findOne = function() {
			$scope.story = Stories.get({ 
				storyId: $stateParams.storyId
			});
		};
	}
]);