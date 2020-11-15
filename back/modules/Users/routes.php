<?php

/** @var \Laravel\Lumen\Routing\Router $router */
$router = $this->app['router'];

// Auth
$router->post('/login', 'LoginController@login');
$router->post('/register', 'RegisterController@register');

// Users
$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/users', 'UserController@getAll');
    $router->get('/users/{id:[0-9]+}', 'UserController@get');
    $router->post('/users', 'UserController@create');
    $router->put('/users', 'UserController@update');
    $router->delete('/users', 'UserController@delete');
});
