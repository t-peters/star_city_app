<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('master');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

// Route::group(['prefix' => 'api'], function()
// {
//     Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
//     Route::post('authenticate', 'AuthenticateController@authenticate');
// });

Route::group(['middleware'=>'web'], function() {
  Route::controller('api','ApiController');
  Route::controller('login','LoginController');
  Route::controller('registration','RegistrationController');
  
});

Route::group(['middleware'=>['web','jwt.auth']], function() {
  Route::controller('password_reset','PasswordResetController');
  Route::controller('auditions','AuditionsController');
});

Route::get('/password_confirm', 'PwdConfirmationCtrl@confirmPassword');



