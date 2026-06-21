<?php

use App\Http\Controllers\PageSectionController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::apiResource('posts', PostController::class);
Route::apiResource('page-sections', PageSectionController::class);
