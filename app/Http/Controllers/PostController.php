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

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'content' => 'required|string|max:255',
        ]);

       $post =  Post::create([
            'content' => $request->input('content'),
            'user_id' => Auth::id(),   
        ]);
        $post->save();
        return redirect(RouteServiceProvider::HOME);
    }
}
