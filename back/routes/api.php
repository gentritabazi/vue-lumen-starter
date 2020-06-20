<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Auth
$router->post('login', 'Auth\LoginController@login');
$router->post('register', 'Auth\RegisterController@register');

// Hello World
$router->get('hello-world', ['middleware' => 'auth'], function () {
    return 'hello world';
});
