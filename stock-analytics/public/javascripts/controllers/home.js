angular.module('StockAnalytics').controller("SideCtrl",[
  '$scope', 
  '$rootScope',
  '$http', 
  '$state', 
  'auth',
  'names',
  'stock',
  function($scope,$rootScope,$http,$state,auth,names,stock){
	 
    $scope.isLoggedIn = auth.isLoggedIn;
     $scope.stockList = names.names;
    $scope.username = auth.currentUser();
      
     $scope.stockInfo = function(index){
        var symbol = names.names[index].symbol.substring(1);
        console.log(symbol);
        stock.setSymbol(symbol);


    };
}]);