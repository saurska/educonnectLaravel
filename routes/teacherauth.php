<?php

use App\Http\Controllers\Teacher\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\TeacherProfileController;
use App\Http\Controllers\Teacher\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Teacher\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Teacher\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Teacher\Auth\NewPasswordController;
use App\Http\Controllers\Teacher\Auth\PasswordController;
use App\Http\Controllers\Teacher\Auth\PasswordResetLinkController;
use App\Http\Controllers\Teacher\Auth\RegisteredUserController;
use App\Http\Controllers\Teacher\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['guest:teacher'], 'prefix' => 'teacher', 'as' =>'teacher.'], function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

Route::group(['middleware' => ['auth:teacher'], 'prefix' => 'teacher', 'as' =>'teacher.'], function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

Route::group(['middleware' => ['auth:teacher'], 'prefix' => 'teacher', 'as' =>'teacher.'], function () {
    Route::get('/profile', [TeacherProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [TeacherProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [TeacherProfileController::class, 'destroy'])->name('profile.destroy');
});
