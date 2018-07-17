var app = angular.module('WikiApp', ['ngAnimate']);
app.controller('myCtrl', function($scope, $http) {
  $("form").hide();
  $('#formText').on('click', function(e){
    e.preventDefault();
    $('div>hr').animate({width: "0"},200, potom);
    function potom(){ 
      $("form").show();
      $('input').focus();
      $('#formText').animate({width: "270px"},200, potom1)}
    function potom1() {
      $('#up').animate({width: "20px"},200, potom2)}
    function potom2() {
      $('#down').animate({width: "20px"},200)}
   });
   $scope.search = function() {
    $('ul').empty().hide();
    $('#form p').hide();
    $('#form').css('justify-content', 'flex-start').removeClass('fullHeight');  
    $scope.results = [];
    var pattern = $("input").val();
    var url ='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=&gsrlimit=10&gsrsearch='+pattern+'&callback=JSON_CALLBACK';
     $http.jsonp(url)
      .success(function(data) {
       var pages = data.query.pages;
       angular.forEach(pages, function(v, k) {
         $scope.results.push({title: v.title, body: v.extract, page: 'https://en.wikipedia.org/?curid=' + v.pageid})
       });
     });
     }
   $('button').click(function(e){
    $('#form').css('justify-content', 'center').addClass('fullHeight');
    $('#form p').show();
    $('ul').empty();
    $('#up').animate({width: "0px"},200, potom);
    function potom(){
      $('#down').animate({width: "0px"},200, potom1)}
    function potom1(){
      $("form").hide();
      $('#formText').animate({width: "40px"},200, potom2)}
    function potom2(){
      $('div>hr').animate({width: "20"},200)}
    e.stopPropagation();
  });
});
