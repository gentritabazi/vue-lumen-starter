<?php

namespace Modules\Users\Controllers;

use App\Http\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Users\Requests\LoginRequest;

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
        return $this->response($data);
    }
}
