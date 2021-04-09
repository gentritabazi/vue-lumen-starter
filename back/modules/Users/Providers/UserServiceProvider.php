<?php

namespace Modules\Users\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Route::group([
            'prefix' => 'api',
            'namespace' => 'Modules\Users\Controllers',
            'middleware' => null,
        ], function () {
            $this->loadRoutesFrom(__DIR__. '/../routes.php');
        });
    }
}
