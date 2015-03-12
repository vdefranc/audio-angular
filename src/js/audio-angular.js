var app = angular.module('Ng-Audio', []);

app.controller('InterviewCtrl', ['$scope', 'playPauseService', function ($scope, playPauseService) {
	$scope.subject = "Daniel Friedman";
	$scope.playing = false;
	$scope.touched = false;
	$scope.audio = document.getElementById('thiel-interview-1-audio');
	$scope.duration = 125;

	$scope.toggle = function () {
		$scope.touched = true;

		//pass in audio element and status, service returns "playing" status
		$scope.playing = playPauseService.toggle($scope.audio, $scope.playing);
	};

	$scope.audio.addEventListener('timeupdate', function() {
		$scope.$apply($scope.$apply(updateTime()));

		if (this.currentTime === this.duration) {
			$scope.playing = false;
			this.currentTime = 0;
		}
	});


	window.onload = firstUpdate;

	function updateTime () {
		$scope.currentTime = $scope.audio.currentTime;
	}

	function firstUpdate () { $scope.$apply(updateTime()); }

}]);

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