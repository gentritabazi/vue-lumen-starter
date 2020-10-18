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

        // Data
        $data = [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ];
        $user = Auth::user()->toArray();
        $data = array_merge($data, $user);

        // Final Response
        return response()->json($data, 200);
    }
}
