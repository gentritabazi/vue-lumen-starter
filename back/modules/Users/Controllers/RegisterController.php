<?php

namespace Modules\Users\Controllers;

use App\Http\Controller;
use Modules\Users\Models\User;
use Modules\Users\Requests\RegisterRequest;

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
        return $this->response(['message' => __('general_words.process_success')], 201);
    }
}
