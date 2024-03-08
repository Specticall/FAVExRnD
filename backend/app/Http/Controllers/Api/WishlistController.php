<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WishlistController extends Controller
{
    public function getWishlist(Request $request)
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

            $wishlist = Wishlist::with('product')->where('user_id', '=', $user->id)->get();

            return response()->json([
                'status' => 200,
                'data' => [
                    'wishlist' => $wishlist
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

    public function addWishlist(Request $request)
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

            $wishlist = Wishlist::where('user_id', '=', $user->id)->where('product_id', '=', $request->product_id)->first();

            if ($wishlist) {
                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => 'This product already exist in the wishlist!'
                    ],
                ], 400);
            }

            $validateWishlist = Validator::make(
                $request->all(),
                [
                    'product_id' => 'required'
                ]
            );

            if ($validateWishlist->fails()) {
                $errors = array();

                foreach ($validateWishlist->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => $errors
                    ]
                ], 400);
            }

            $user->wishlist()->attach($request->product_id);

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Add to wishlist success!'
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

    public function removeWishlist(Request $request)
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

            $wishlist = Wishlist::where('id', '=', $request->route('id'))->first();

            if (!$wishlist) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Data not found!'
                    ]
                ], 404);
            }

            Wishlist::where('id', '=', $wishlist->id)->delete();

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
