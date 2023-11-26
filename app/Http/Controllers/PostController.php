<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function create(){
        return Inertia::render('Posts/PostForm');
    }
    public function index(): Response
{
    $posts = Post::with('user')->get();

    return Inertia::render('Dashboard', [
        'posts' => $posts,
    ]);
}
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'content' => 'required|string',
        ]);
        if (Auth::guard('teacher')->check()) {
            // The authenticated user is a teacher
            $userType = 'teacher';
            $user_id = Auth::guard('teacher')->id();
        } elseif (Auth::guard('web')->check()) {
            // The authenticated user is a student
            $userType = 'user';
            $user_id = Auth::guard('web')->id();
        } else {
            // Handle other user types or scenarios
            abort(403, 'Unauthorized');
        }
       $post =  Post::create([
            'content' => $request->input('content'),    
            'user_type' => $userType,
            'user_id' =>$user_id,   
        ]);
        $post->save();
        return redirect(RouteServiceProvider::HOME);
    }
}
