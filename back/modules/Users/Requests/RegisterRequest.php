<?php

namespace Modules\Users\Requests;

use App\Http\ApiRequest;

class RegisterRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * The validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|between:1,20',
            'last_name' => 'required|between:1,20',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|between:6,255',
            'gender' => 'in:m,f'
        ];
    }
}
