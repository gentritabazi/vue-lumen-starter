<?php
// API
$router->group(['prefix' => 'api'], function() use ($router) {
    // Auth
    $router->post('login', 'Auth\AuthController@login');
    $router->post('register', 'Auth\AuthController@register');
});