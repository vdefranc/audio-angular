var app = angular.module('Ng-Audio', []);

app.controller('InterviewCtrl', ['$scope', 'playPauseService', 'timeControlService', function ($scope, playPauseService, timeControlService) {
	$scope.subject = "Daniel Friedman";
	$scope.playing = false;
	$scope.audio = document.getElementById('thiel-interview-1-audio');
	$scope.duration = 125; // in seconds

	$scope.toggle = function () {
		//pass in audio element and status, service returns "playing" status
		$scope.playing = playPauseService.toggle($scope.audio, $scope.playing);
	};

	// sets listener for for time changes
	timeControlService($scope);
}]);

// owns play/pause functionality
app.service('playPauseService', function () {
	this.toggle = function (el, playing) {

		if (playing) {
			el.pause();
			return false;

		} else {
			el.play();
			return true;
		}

	};
});

// updates displayed current time
app.factory('timeControlService', function () {
	return function (_scope) {
		_scope.audio.addEventListener('timeupdate', function() {
			updateTime();

			// stops and resets audio if end of interview has been reached
			if (this.currentTime === this.duration) {
				_scope.playing = false;
				this.currentTime = 0;
			}
		});

		function updateTime () {
			_scope.$apply(function () {
				_scope.currentTime = _scope.audio.currentTime;
			}); 
		}
	};
});

// filters raw current time data from audio element into MM:SS
app.filter('numToSecs', function () {
    return function (seconds) {
		if (!seconds) {
			return '0:00';
		}

		var minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : "0" + seconds;

		return minutes + ":" + seconds;
    };
});