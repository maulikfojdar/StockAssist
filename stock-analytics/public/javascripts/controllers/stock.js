angular.module('StockAnalytics').controller('StockCtrl', [
'$scope',
'stock',
'names',
function($scope,stock,names){

	$scope.tweetBox = false;
        $scope.toggleBox = function() {
            $scope.tweetBox = $scope.tweetBox === false ? true: false;
        };

	$scope.company = "Please select stock quote!!";
	$scope.$on("stockObj",function(){
		$scope.symbol = stock.getSymbol();
		$scope.company = names.getName($scope.symbol);
		console.log($scope.company);
	});

	$scope.$on("topTweets",function(){
		
		$scope.topTweets = stock.topTweets;
		console.log($scope.topTweets);

	});

	/*$scope.$on("allTweets",function(){
		
		$scope.allTweets = stock.allTweets;
		console.log($scope.allTweets);

	});*/


	$scope.$on("sentiment",function(){
		
		$scope.sentiment = stock.sentiment;
		console.log($scope.sentiment);

	});

	$scope.$on("stockValue",function(){
		
		$scope.currentStock = stock.currentStock;
		$scope.predictedStock = stock.predictedStock;
		console.log($scope.currentStock);
		console.log($scope.predictedStock);

	});
	
		

}]);



