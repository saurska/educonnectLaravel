<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeacherController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// -----------------------------Teacher routes---------------------------------------
Route::prefix('teacher')->group(function (){
// Login routes    
Route::get('/login',[TeacherController::class, 'index'] )->name('teacher_login_form');

Route::get('/login/owner',[TeacherController::class, 'login'] )->name('teacher_login');

Route::get('/dashboard',[TeacherController::class, 'dashboard'] )->name('teacher_dashboard');

// Register Routes

Route::get('/register',[TeacherController::class, 'index'] )->name('teacher_register_form');

// Route::post('/register',[TeacherController::class, 'index'] )->name('teacher_register_form_post');


});

//------------------------------ Teacher routes end ----------------------------------

require __DIR__.'/auth.php';
