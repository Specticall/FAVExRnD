<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function getCart(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user->role) {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'You must login!'
                    ]
                ], 401);
            }

            $cart = Cart::with('product')->where('user_id', '=', $user->id)->get();

            return response()->json([
                'status' => 200,
                'data' => [
                    'cart' => $cart
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => 'Internal server error!'
                ]
            ], 500);
        }
    }

    public function addToCart(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user->role) {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'You must login!'
                    ]
                ], 401);
            }

            $validateCart = Validator::make(
                $request->all(),
                [
                    'quantity' => 'required',
                    'product_id' => 'required'
                ]
            );

            if ($validateCart->fails()) {
                $errors = array();

                foreach ($validateCart->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => $errors
                    ]
                ], 400);
            }

            $cart = Cart::where('user_id', '=', $user->id)->where('product_id', '=', $request->product_id)->first();

            if ($cart) {
                Cart::where('id', '=', $cart->id)->update([
                    'quantity' => $cart->quantity + $request->quantity
                ]);

                return response()->json([
                    'status' => 200,
                    'data' => [
                        'msg' => 'This product already exist in the cart, the quantity will be added. Success update data!'
                    ],
                ], 200);
            }

            $user->cart()->attach($request->product_id, ['quantity' => $request->quantity]);

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Add to cart success!'
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => $th->getMessage()
                ]
            ], 500);
        }
    }

    public function editCartItem(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user->role) {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'You must login!'
                    ]
                ], 401);
            }

            $cart = Cart::where('id', '=', $request->route('id'))->first();

            if (!$cart) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Data not found!'
                    ]
                ], 404);
            }

            $validateCart = Validator::make(
                $request->all(),
                [
                    'quantity' => 'required'
                ]
            );

            if ($validateCart->fails()) {
                $errors = array();

                foreach ($validateCart->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => $errors
                    ]
                ], 400);
            }

            Cart::where('id', '=', $cart->id)->update([
                'quantity' => $request->quantity
            ]);

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Success update data!'
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => $th->getMessage()
                ]
            ], 500);
        }
    }

    public function decrement(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user->role) {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'You must login!'
                    ]
                ], 401);
            }

            $cart = Cart::where('id', '=', $request->route('id'))->first();

            if (!$cart) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Data not found!'
                    ]
                ], 404);
            }

            if (($cart->quantity - 1) == 0) {
                Cart::where('id', '=', $cart->id)->delete();

                return response()->json([
                    'status' => 200,
                    'data' => [
                        'msg' => 'Success delete data!'
                    ],
                ], 200);
            }

            Cart::where('id', '=', $cart->id)->update([
                'quantity' => $cart->quantity - 1
            ]);

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Success update data!'
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => $th->getMessage()
                ]
            ], 500);
        }
    }

    public function removeFromCart(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user->role) {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'You must login!'
                    ]
                ], 401);
            }

            $cart = Cart::where('id', '=', $request->route('id'))->first();

            if (!$cart) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Data not found!'
                    ]
                ], 404);
            }

            Cart::where('id', '=', $cart->id)->delete();

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Success delete data!'
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => 'Internal server error!'
                ]
            ], 500);
        }
    }
}
