<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getCart(Request $request)
    {
        try {
            //code...
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
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => 'Internal server error!'
                ]
            ], 500);
        }
    }

    public function editCartItem(Request $request)
    {
        try {
            //code...
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'data' => [
                    'msg' => 'Internal server error!'
                ]
            ], 500);
        }
    }

    public function removeFromCart(Request $request)
    {
        try {
            //code...
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
