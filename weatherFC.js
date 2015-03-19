/**
 * Created by developer on 3/18/15.
 */
var app = angular.module('weatherQuery',[]);
app.controller('weatherCtrl',function($scope,$http){
//  $scope.queryDate="2015-03-18";
//  $scope.queryCity="shanghai";
  $scope.parseInt= parseInt;
  $scope.wetherValid=new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);



  $scope.queryResult=function(queryDate,queryCity){
      if(queryDate&&queryCity)
      {
//  1.filter and verify
      var dataArray = $scope.queryDate.split("-");
      var today,someday,para;
      today = new Date();
      someday = new Date();
      someday.setFullYear(dataArray[0],dataArray[1]-1,dataArray[2]);
      //2.ajax get request
      if(someday >= today){
        para = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=16"+"&q="+$scope.queryCity;
//  }else if(someday == today ){
//        para = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=7"+"&"+$scope.queryCity;
      }else {
//        para = "";
        alert("sorry for no history data!");
        return;
      }
      $http.get(para).success(function(response) {
        if (response.cod == "404") {
          alert("please input right city name!");
          return;
        }
        else {
          //package weather data
          var startIndex = 0;
          if (someday > today) {
            startIndex = parseInt((someday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          }
          var weatherData = [];
          for (var i = startIndex, j = 0, len = response.list.length; i < len; i++, j++) {
            var row = {};
            var rowDate = new Date(someday);
            rowDate.setDate(someday.getDate() + j);
            row.date = rowDate;
            row.max = parseInt(response.list[i].temp.max - 273.15) + "°C";
            row.min = parseInt(response.list[i].temp.min - 273.15) + "°C";
            row.weather = response.list[i].weather[0].description;
            row.city = response.city.name;
            weatherData.push(row);
          }
          if (weatherData.length > 7) {
            weatherData = weatherData.slice(0, 7);
          }
          if (weatherData.length == 0) {
            alert("Sorry,get no data!")
          }
          $scope.weatherResult = weatherData;
        }
      })

      }
      else{
      alert("Please choose your city and date!");
    }
  };
});