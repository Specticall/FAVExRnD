<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getProducts(Request $request)
    {
        try {
            $products = [];

            foreach (Product::all() as $key => $value) {
                $obj = $value;
                $obj->user = $value->user;
                $obj->categories = $value->categories;

                array_push($products, $obj);
            }

            return response()->json([
                'status' => 200,
                'data' => [
                    'products' => $products
                ]
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

    public function createProduct(Request $request)
    {
        try {
            $user = $request->user();

            if ($user->role != 'Admin') {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'Admin only!'
                    ]
                ], 401);
            }

            $validateProduct = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'img' => 'required',
                    'desc' => 'required',
                    'price' => 'required',
                    'stock' => 'required'
                ]
            );

            if ($validateProduct->fails()) {
                $errors = array();

                foreach ($validateProduct->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => $errors
                    ]
                ], 400);
            }

            $product = Product::create([
                'name' => $request->name,
                'img' => $request->img,
                'desc' => $request->desc,
                'price' => $request->price,
                'stock' => $request->stock,
                'user_id' => $user->id
            ]);

            $product = Product::where('id', '=', $product->id)->first();

            $product->categories()->attach($request->categories);

            $product->user;
            $product->categories;

            return response()->json([
                'status' => 200,
                'data' => [
                    'product' => $product
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

    public function editProduct(Request $request)
    {
        try {
            $user = $request->user();

            if ($user->role != 'Admin') {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'Admin only!'
                    ]
                ], 401);
            }

            $product = Product::where('id', '=', $request->route('id'))->first();

            if (!$product) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Product not found!'
                    ]
                ], 404);
            }

            $validateProduct = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'img' => 'required',
                    'desc' => 'required',
                    'price' => 'required',
                    'stock' => 'required'
                ]
            );

            if ($validateProduct->fails()) {
                $errors = array();

                foreach ($validateProduct->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => $errors
                ], 400);
            }

            $product = Product::where('id', '=', $request->route('id'))->update([
                'name' => $request->name,
                'img' => $request->img,
                'desc' => $request->desc,
                'price' => $request->price,
                'stock' => $request->stock
            ]);

            $product = Product::where('id', '=', $request->route('id'))->first();

            $product->categories()->detach();
            $product->categories()->attach($request->categories);

            $product->user;
            $product->categories;

            return response()->json([
                'status' => 200,
                'data' => [
                    'product' => $product
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

    public function deleteProduct(Request $request)
    {
        try {
            $user = $request->user();

            if ($user->role != 'Admin') {
                return response()->json([
                    'status' => 401,
                    'data' => [
                        'msg' => 'Admin only!'
                    ]
                ], 401);
            }

            $product = Product::where('id', '=', $request->route('id'))->first();

            if (!$product) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Product not found!'
                    ]
                ], 404);
            }

            $product = Product::where('id', '=', $request->route('id'))->delete();

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Delete product success'
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

    public function getProductById(Request $request)
    {
        try {
            $product = Product::where('id', '=', $request->route('id'))->first();

            if (!$product) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Product not found!'
                    ]
                ], 404);
            }

            $product = Product::where('id', '=', $request->route('id'))->first();

            $product->user;
            $product->categories;

            return response()->json([
                'status' => 200,
                'data' => [
                    'product' => $product
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
