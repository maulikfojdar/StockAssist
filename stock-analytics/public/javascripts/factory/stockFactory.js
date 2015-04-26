angular.module('StockAnalytics').factory('stock',['$http','$rootScope',function($http,$rootScope){

	var o = {
		allTweets:[],
		topTweets:[],
		sentiment: 0,
		currentStock: 0,
		predictedStock: 0,
		stockSymbol: ""
	};
   	
   	o.getSymbol = function(){
   		console.log(o.stockSymbol);
   		return o.stockSymbol;
   	};

   	o.setSymbol = function(symbol){
   		o.stockSymbol = symbol;
   		$rootScope.$broadcast("stockObj");
   		o.getSentiment(symbol);
   		o.getPredictedStock(symbol);
   		o.getTopTweets(symbol);
   	};

    o.getSentiment = function(symbol){
        return $http.get("http://54.191.103.141:8800/getSentiment/"+symbol).success(function(data){
        	o.sentiment = data["net_sentiment"]*100;
        	$rootScope.$broadcast("sentiment");
      	});
    };

    o.getPredictedStock = function(symbol){
        return $http.get("http://54.191.103.141:8800/getPredictedStock/"+symbol).success(function(data){
        	o.predictedStock = data["predicted_value"]
        	o.currentStock = data["current_value"];
        	$rootScope.$broadcast("stockValue");
      	});
    }; 

    o.getTopTweets = function(symbol){
      	return $http.get("http://54.191.103.141:8800/getTopTweets/"+symbol).success(function(data){
          	o.topTweets = data;
          	$rootScope.$broadcast("topTweets");
      	});
    };

    /*o.getAllTweets = function(symbol){
      	return $http.get("http://54.191.103.141:8800/getAllTweets/"+symbol).success(function(data){
          	o.allTweets = data;
          	$rootScope.$broadcast("allTweets");
      	});
    };*/

    return o;
}]);


