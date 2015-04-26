angular.module('StockAnalytics',['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('login',{
        url : '/login',
        templateUrl : 'partials/login.html',
        controller : 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('home');
            }
        }]
    })
    .state('register',{
        url : '/register',
        templateUrl : 'partials/register.html',
        controller : 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('home');
            }
        }]
    })
    .state('navbar',{
        templateUrl : 'partials/navbar.html',
        controller : 'NavCtrl',
        
    })
    .state('home',{
        url : '/{user}',
        templateUrl : 'partials/home.html',
        onEnter: ['$state', 'auth', function($state, auth){
            if(!auth.isLoggedIn()){
                $state.go('login');
            }
        }],
         resolve: {
        postPromise: ['names', function(names){
          return names.getAll();
        }]
      }
      
    });

    $urlRouterProvider.otherwise('home');
}]);
