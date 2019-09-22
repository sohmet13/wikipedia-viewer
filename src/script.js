import angular from 'angular';
import $ from 'jquery';

import './style.scss';

const app = angular.module('WikiApp', []);
app.controller('myCtrl', ($scope, $http) => {
  const placeholder = 'Click icon for search';
  $scope.load = placeholder;

  $scope.search = () => {
    $scope.load = 'Loading...';
    $('.wiki-app').addClass('wiki-app_flex-start');
    $('.search-form').addClass('search-form_m-t-10');
    $scope.results = [];
    $http
      .get('https://en.wikipedia.org//w/api.php?' +
              'action=query&format=json&prop=extracts&list=&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1' +
              '&gsrnamespace=&gsrlimit=10&gsrsearch=' + $scope.pattern)
      .then(success, error);
  };

  $scope.toggleForm = () => {
    $scope.results = [];
    $scope.load = placeholder;
    $('.wiki-app').removeClass('wiki-app_flex-start');
    $('.search-form').removeClass('search-form_m-t-10');
    $('.search-form__pattern').focus();
    $('.search-form__close-button').toggleClass('search-form__close-button_show-lines');
    $('.search-form').toggleClass('search-form_open');
  };

  function success(data) {
    if (Object.prototype.hasOwnProperty.call(data, 'query')) {
      $scope.load = '';
      angular.forEach(data.query.pages, (page) => {
        $scope.results.push({
          title: page.title,
          body: page.extract,
          page: `https://en.wikipedia.org/?curid=${page.pageid}`
        });
      });
    } else {
      $scope.load = 'Failed to find results in English Wikipedia on your request';
    }
  }

  function error(error) {
    console.warn(error);
    $scope.load = 'Can\'t get the results of your request';
  }
});