/**
 * Created by developer on 3/18/15.
 */
var app = angular.module('weatherQuery',[]);
app.controller('weatherCtrl',function($scope,$http){
  //bind button click
  $scope.queryResult=function(queryDate,queryCity){
    console.log(queryDate,queryCity);
    if(queryDate&&queryCity){
//  1.filter and verify
      var dataArray = $scope.queryDate.split("-");

      var today,someday,para;
      today = new Date();
      console.log("fff",today);
      someday = new Date();
      someday.setFullYear(dataArray[0],dataArray[1],dataArray[2]);
      //2.ajax get request
      if(someday >= today){
        console.log();
        para = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=16"+"&q="+$scope.queryCity;
//  }else if(someday == today ){
//        para = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=7"+"&"+$scope.queryCity;
      }else {
        para = "";
      }
      $http.get(para).success(function(response){
        console.log(response);

      })

    }else{
      alert("Please choose your city and date!");
    }
  };
});