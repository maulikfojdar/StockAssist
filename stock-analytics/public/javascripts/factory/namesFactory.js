angular.module('StockAnalytics').factory('names', ['$http',function($http){
  var o = {
    names: []
  };


  o.getAll = function() {
    return $http.get("http://54.191.103.141:8800/getSentiments").success(function(data){
      angular.copy(data, o.names);
    });
  };

  o.getName = function(symbol){
  	symbol = "$"+symbol;
  	for(var i = 0; i< o.names.length; i++){
  		if(o.names[i].symbol == symbol){
  			return o.names[i].name;
  		}
  	}
  	return null;
  }

return o;
}]);