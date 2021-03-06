'use strict';

angular.module('StarCityApp')
    .service('Registrationservice', function Registrationservice($http, $q, Upload, $cacheFactory) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var _ = {};
        var photoCache = $cacheFactory('photStore');

        _.checkEmail = function(data) {
            var d = $q.defer();
            $http.post('index.php/registration/star-check-email', data).then(function(res) {
                d.resolve(res);
            }).catch(function(e) {
                d.reject(e);
            })

            return d.promise;
        }

        _.checkEmailSM = function(data) {
            var d = $q.defer();
            $http.post('index.php/registration/star-maker-check-email',data).then(function(res) {
                d.resolve(res);
            }).catch(function(e) {
                d.resolve(e);
            });

            return d.promise;
        }

        _.uploadPhoto = function(photoData) {
            var d = $q.defer();
            $http.post('index.php/registration/photo-upload', photoData).then(function(res) {
                console.log(res);
            })


        }

        _.checkPhoto = function(photo) {
            var d = $q.defer();

            Upload.upload({
                url: 'index.php/registration/validate-photo',
                data: { file: photo }
            }).then(function(res) {
                if (res.data.code === 'success') {

                    d.resolve(res);
                }

            });

            return d.promise;
        }

        _.submit = function(regData) {
            var d = $q.defer();
            $http.post('index.php/registration/register-star', regData).then(function(res) {
                d.resolve(res.data);
            }).catch(function(e) {
                d.reject(e);
            });

            return d.promise;
        }

        _.fbReg = function() {
             var q = $q.defer();
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', 'GET', { "fields": "id,name,birthday,first_name,last_name,gender,quotes,email,picture,location" }, function(res) {
                        if (res.error || !res) {
                            q.reject('No Response');
                        } else {
                            res.accessToken = FB.getAuthResponse().accessToken;
                            q.resolve(res);
                        }
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });

            return q.promise;
        }

        _.starMakerReg = function(data) {
            var q = $q.defer();
            $http.post('index.php/registration/register-star-maker',data).then(function(res) {
                q.resolve(res);
            }).catch(function(e) {
                q.reject();
            });

            return q.promise;
        }


        return _;


    });
