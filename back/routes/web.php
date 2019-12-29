<?php
// API
$router->group(['prefix' => 'api'], function() use ($router) {
    // Auth
    $router->post('login', 'Auth\AuthController@login');
    $router->post('register', 'Auth\AuthController@register');

    // User Info
    $router->group(['middleware' => 'auth'], function() use($router) {
        $router->post('user_info', 'Auth\AuthController@userInfo');
        $router->post('user/{$id}', 'Auth\AuthController@userInfo');
    });
});