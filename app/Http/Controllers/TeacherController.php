<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Providers\RouteServiceProvider;
use App\Models\Teacher;
use App\Events\TeacherRegistered;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function index() :Response{
        return Inertia::render('Teacher/Register');
    }

    public function login_form(){
        return Inertia::render('Teacher/Login');
    }
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.Teacher::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $teacher = Teacher::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new TeacherRegistered($teacher));

        Auth::guard('teacher')->login($teacher);

        return redirect(RouteServiceProvider::HOME);
    }
}
