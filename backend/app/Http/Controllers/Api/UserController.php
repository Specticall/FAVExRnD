<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'address' => 'required',
                    'phone' => 'required|min:9|max:13',
                    'birthdate' => 'required|date_format:Y-m-d',
                    'password' => 'required|min:8'
                ]
            );

            if ($validateUser->fails()) {
                $errors = array();

                foreach ($validateUser->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => $errors
                    ]
                ], 400);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'phone' => $request->phone,
                'birthdate' => $request->birthdate,
                'password' => Hash::make($request->password),
                'role' => "Basic"
            ]);

            return response()->json([
                'status' => 200,
                'data' => [
                    'token' => $user->createToken("API TOKEN")->plainTextToken
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => "Internal server error!"
                ]
            ], 500);
        }
    }

    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => 'Invalid email or password!',
                    ]
                ], 400);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => 'Invalid email or password!',
                    ]
                ], 400);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => 200,
                'data' => [
                    'token' => $user->createToken("API TOKEN")->plainTextToken
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => "Internal server error!"
                ]
            ], 500);
        }
    }
}
