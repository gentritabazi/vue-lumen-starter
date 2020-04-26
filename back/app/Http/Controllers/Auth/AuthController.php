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
    public function login(Request $request) {
        // Validate
        $rules = array(
            'email' => 'required',
            'password' => 'required',
        );
        $messages = array(
            'email.required' => 'validation.email.required',
            'password.required' => 'validation.password.required',
        );
        $validator = Validator::make($request->all(), $rules, $messages);
        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); 
        }

        // Check
        $credentials = $request->only(['email', 'password']);
        if(!$token = Auth::attempt($credentials)) {
            return response()->json(['errors' => ['login' => ['login.failed']]], 422);
        }

        // Final Response
        return $this->respondWithToken($token);
    }

    /**
     * Store a new user.
     *
     * @param Request $request
     * @return JSON
     */
    public function register(Request $request) {
        // Validate
        $rules = array(
            'first_name' => 'required|between:1,20',
            'last_name' => 'required|between:1,20',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|between:6,255',
        );
        $messages = array(
            'first_name.required' => 'validation.first_name.required',
            'first_name.between' => 'validation.first_name.between',
            'last_name.required' => 'validation.last_name.required',
            'last_name.between' => 'validation.last_name.between',
            'email.required' => 'validation.email.required',
            'email.unique' => 'validation.email.unique',
            'email.email' => 'validation.email.email',
            'password.required' => 'validation.password.required',
            'password.between' => 'validation.password.between',
        );
        $validator = Validator::make($request->all(), $rules, $messages);
        if($validator->fails()) {
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
        return response()->json(['message' => 'process_success'], 201);
    }
}