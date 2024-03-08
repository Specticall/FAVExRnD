<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'loginUser']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/products/{id}', [ProductController::class, 'getProductById']);
Route::middleware('auth:sanctum')->post('/products', [ProductController::class, 'createProduct']);
Route::middleware('auth:sanctum')->put('/products/{id}', [ProductController::class, 'editProduct']);
Route::middleware('auth:sanctum')->delete('/products/{id}', [ProductController::class, 'deleteProduct']);

Route::get('/categories', [CategoryController::class, 'getCategories']);
Route::middleware('auth:sanctum')->post('/categories', [CategoryController::class, 'createCategory']);
Route::middleware('auth:sanctum')->put('/categories/{id}', [CategoryController::class, 'editCategory']);
Route::middleware('auth:sanctum')->delete('/categories/{id}', [CategoryController::class, 'deleteCategory']);
