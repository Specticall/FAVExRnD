<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function getCategories(Request $request)
    {
        try {
            $categories = Category::all();

            return response()->json([
                'status' => 200,
                'data' => [
                    'categories' => $categories
                ]
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

    public function createCategory(Request $request)
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

            $validateCategory = Validator::make(
                $request->all(),
                [
                    'label' => 'required|unique:categories,label'
                ]
            );

            if ($validateCategory->fails()) {
                $errors = array();

                foreach ($validateCategory->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => [
                        'msg' => $errors
                    ]
                ], 400);
            }

            $category = Category::create([
                'label' => $request->label
            ]);

            return response()->json([
                'status' => 200,
                'data' => [
                    'category' => $category
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

    public function editCategory(Request $request)
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

            $category = Category::where('id', '=', $request->route('id'))->first();

            if (!$category) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Category not found!'
                    ]
                ], 404);
            }

            $validateCategory = Validator::make(
                $request->all(),
                [
                    'label' => 'required|unique:categories,label'
                ]
            );

            if ($validateCategory->fails()) {
                $errors = array();

                foreach ($validateCategory->errors()->getMessages() as $key => $value) {
                    array_push($errors, $value[0]);
                }

                return response()->json([
                    'status' => 400,
                    'data' => $errors
                ], 400);
            }

            $category = Category::where('id', '=', $request->route('id'))->update([
                'label' => $request->label
            ]);

            return response()->json([
                'status' => 200,
                'data' => [
                    'category' => Category::where('id', '=', $request->route('id'))->first()
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

    public function deleteCategory(Request $request)
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

            $category = Category::where('id', '=', $request->route('id'))->first();

            if (!$category) {
                return response()->json([
                    'status' => 404,
                    'data' => [
                        'msg' => 'Category not found!'
                    ]
                ], 404);
            }

            $category = Category::where('id', '=', $request->route('id'))->delete();

            return response()->json([
                'status' => 200,
                'data' => [
                    'msg' => 'Delete category success'
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
