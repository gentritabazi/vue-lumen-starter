<?php

namespace App\Http\Controllers\Auth;

use App\Models\Auth\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

class LoginController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @param  LoginRequest  $request
     * @return JSON
     */
    public function login(LoginRequest $request)
    {
        // Check
        $credentials = $request->only(['email', 'password']);
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['errors' => ['login' => [__('auth.failed')]]], 422);
        }

        // Final Response
        return response()->json([
            'user' => Auth::user(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], 200);
    }
}
