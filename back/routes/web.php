<?php
// API
$router->group(['prefix' => 'api'], function () use ($router) {
    // Auth
    $router->post('login', 'Auth\AuthController@login');
    $router->post('register', 'Auth\AuthController@register');

    // Hello World
    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->get('hello-world', function () {
            return 'hello world';
        });
    });
});
