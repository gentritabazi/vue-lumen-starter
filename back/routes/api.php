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
$router->post('login', 'Auth\AuthController@login');
$router->post('register', 'Auth\AuthController@register');

// Hello World
$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('hello-world', function () {
        return 'hello world';
    });
});
