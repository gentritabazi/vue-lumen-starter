<?php

namespace App\Http\Controllers\Auth;

use App\Models\Auth\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;

class RegisterController extends Controller
{
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
