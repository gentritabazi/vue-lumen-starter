<?php

/** @var \Laravel\Lumen\Routing\Router $router */
$router = $this->app['router'];

// Auth
$router->post('/login', 'LoginController@login');
$router->post('/register', 'RegisterController@register');
