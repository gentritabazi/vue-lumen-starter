<?php

namespace App\Http\Controllers\Auth;

use App\Models\Auth\User;
// use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
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

    /**
     * Store a new user.
     *
     * @param  RegisterRequest  $request
     * @return JSON
     */
    public function register(RegisterRequest $request)
    {
        // Save to DB
        $user = new User($request->all());
        $user->save();

        // Final Response
        return response()->json(['message' => __('general_words.process_success')], 201);
    }
}
