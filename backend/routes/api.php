<?php

use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishlistController;
use App\Models\User;
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
    $obj = $request->user();

    return [
        'name'=>$obj->name,
        'email'=>$obj->email,
        'address'=>$obj->address,
        'phone'=>$obj->phone,
        'birthdate'=>$obj->birthdate,
        'role'=>$obj->role
    ];
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

Route::middleware('auth:sanctum')->get('/cart', [CartController::class, 'getCart']);
Route::middleware('auth:sanctum')->post('/cart', [CartController::class, 'addToCart']);
Route::middleware('auth:sanctum')->put('/cart/decrement/{id}', [CartController::class, 'decrement']);
Route::middleware('auth:sanctum')->put('/cart/{id}', [CartController::class, 'editCartItem']);
Route::middleware('auth:sanctum')->delete('/cart/{id}', [CartController::class, 'removeFromCart']);

Route::middleware('auth:sanctum')->get('/wishlist', [WishlistController::class, 'getWishlist']);
Route::middleware('auth:sanctum')->post('/wishlist', [WishlistController::class, 'addWishlist']);
Route::middleware('auth:sanctum')->delete('/wishlist/{id}', [WishlistController::class, 'removeWishlist']);
