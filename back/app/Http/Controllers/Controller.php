<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    protected function respondWithToken($token) {
        return response()->json([
            'token' => $token,
            'user_id' => Auth::user()->id,
            'user_name' => Auth::user()->getName(),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], 200);
    }
}