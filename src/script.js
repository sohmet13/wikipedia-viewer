import angular from 'angular';

import './style.scss';

var app = angular.module('WikiApp', []);
app.controller('myCtrl', function($scope, $http) {
  const formText = $('#formText');
  const hr = $('div>hr');
  const form = $("form");
  const input = $('input');
  const up = $('#up');
  const down = $('#down');
  const htmlBody = $('html, body');
  $scope.load ='Click icon to search';
  $scope.open = () => {
    formText.css({cursor: 'auto'});
    hr.animate({width: "0"}, 200, function() {
      form.css({display: 'block'});
      input.focus();
      formText.animate({width: "270px"}, 200, function() {
        up.animate({width: "20px"}, 200, function() {
        down.animate({width: "20px"}, 200);
        });
      });
    }); 
  };
  $scope.search = () => {
    $scope.load = 'Loading...';
    htmlBody.css({
      justifyContent: 'flex-start'
    });  
    formText.css({
      marginTop: '10px'
    }); 
    getData();
  }
  function getData() {
    let pattern = $("input").val();
    $scope.results = [];
    let url ='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=&gsrlimit=10&gsrsearch='+pattern+'&callback=JSON_CALLBACK';
    $http.jsonp(url)
      .success(function(data) {
       if (data.hasOwnProperty('query')) {
         let pages = data.query.pages;
         $scope.load = '';
         angular.forEach(pages, function(v) {
         $scope.results.push({title: v.title, body: v.extract, page: 'https://en.wikipedia.org/?curid=' + v.pageid})
        });
       } else {
         $scope.load = 'Failed to find results in English Wikipedia on your request';
       }
    })
    .error(function() {
      $scope.load = 'Error occured';
    })
  }
  $scope.close = () => {
    $scope.results = [];
    $scope.load ='Click icon to search';
    htmlBody.css({
      justifyContent: 'center'
    }); 
    formText.css({
      marginTop: '0'
    }); 
    up.animate({width: "0"}, 200, function() {
      down.animate({width: "0"}, 200,  function() {
        form.css({display: 'none'});
        formText.animate({width: "30px"}, 200, function(){
          formText.css({cursor: 'pointer'});
          hr.animate({width: "20px"}, 200);
        });
      });
    });
  };
});