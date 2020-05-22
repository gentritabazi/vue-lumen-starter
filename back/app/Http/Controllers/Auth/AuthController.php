<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Auth\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @param Request $request
     * @return JSON
     */
    public function login(Request $request)
    {
        // Validate
        $rules = array(
            'email' => 'required',
            'password' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

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
     * @param Request $request
     * @return JSON
     */
    public function register(Request $request)
    {
        // Validate
        $rules = array(
            'first_name' => 'required|between:1,20',
            'last_name' => 'required|between:1,20',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|between:6,255',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Save to DB
        $user = new User;
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        // Final Response
        return response()->json(['message' => __('general_words.process_success')], 201);
    }
}
