angular.module('StockAnalytics').controller('StockCtrl', [
'$scope',
'stock',
'names',
function($scope,stock,names){

	$scope.flag =1;

	$scope.tweetBox = false;
        $scope.toggleBox = function() {
            $scope.tweetBox = $scope.tweetBox === false ? true: false;
        };

	$scope.company = "Please select stock quote!!";
	$scope.$on("stockObj",function(){
		$scope.symbol = stock.getSymbol();
		$scope.flag = 0;
		$scope.company = names.getName($scope.symbol);
		//console.log($scope.company);
	});

	$scope.$on("topTweets",function(){
		
		$scope.topTweets = stock.topTweets;
		//console.log($scope.topTweets);

	});

	$scope.$on("topTweetsAll",function(){
		
		$scope.topTweetsAll = stock.topTweetsAll;
		console.log($scope.topTweetsAll);

	});


	$scope.$on("stockTrend",function(){
		
		$scope.stockTrend = stock.stockTrend;
		var dArr1 = [];
		var dArr2 = [];
		for(var i = 7; i > 0; i--){
			var d = new Date();
			var d = new Date(d.setDate(d.getDate() - i));
			var day = d.toString().split(' ');
			
			if(day[0] != "Sun" && day[0] != "Sat"){
				console.log(day[0]);
				var year = d.getFullYear();

				var month = d.getMonth() + 1;

				var date = d.getDate();
				var input = year+"-0"+month+"-"+date;
				dArr1.push(input);
				dArr2.push(d.setDate(d.getDate()));
			}
			//console.log($scope.stockTrend[dArr[i]]);
		}

		console.log(dArr1);
		console.log(dArr2);
		
		var chart1Arr = [];
		var chart2Arr = [];
		var dateArr = [];
		for(var i = 0; i< dArr1.length; i++){
			
			var first = dArr2[i];
			var second = Number($scope.stockTrend[dArr1[i]].High);
			var third = Number($scope.stockTrend[dArr1[i]].Low);
			var fourth = Number($scope.stockTrend[dArr1[i]].Open);
			var fifth = Number($scope.stockTrend[dArr1[i]].Close);
			var sixth = Number($scope.stockTrend[dArr1[i]].Volume);
			dateArr = [first,second,third,fourth,fifth];

			chart1Arr.push(dateArr);
			chart2Arr.push([first,sixth]);
			
			

		}
		console.log(chart1Arr);
		console.log(chart2Arr);

		 // create the chart
        angular.element('#container').highcharts('StockChart', {

            

            title: {
                text: $scope.symbol+' Historical Data'
            },

            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Stock Price'
                },
                height: '60%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

            series: [{
                type: 'candlestick',
                name: $scope.company,
                data: chart1Arr
            }, {
                type: 'column',
                name: 'Volume',
                data: chart2Arr,
                yAxis: 1
            }]
        });

		
		
		
		

	});


	$scope.$on("sentiment",function(){
		
		$scope.sentiment = stock.sentiment;
		//console.log($scope.sentiment);

	});

	$scope.$on("stockValue",function(){
		
		$scope.currentStock = stock.currentStock;
		$scope.predictedStock = stock.predictedStock;
		//console.log($scope.currentStock);
		//console.log($scope.predictedStock);

	});
	
		

}]);



