<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Teacher;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class PostController extends Controller
{
    public function checkUser(){
        if (Auth::guard('teacher')->check()) {
            // The authenticated user is a teacher
            
            return 'teacher';
        } elseif (Auth::guard('web')->check()) {
            // The authenticated user is a student
            return'user';
            
        } else {
            // Handle other user types or scenarios
            abort(403, 'Unauthorized');
        }
    }
    public function create(){
        
        if (Auth::guard('teacher')->check()) {
            return Inertia::render('Posts/TeacherPostForm',[
                
            ]);
        }
        return Inertia::render('Posts/PostForm');
    }
    public function index(): Response
{
    $posts = Post::with('user')->get();
    $comments = Comment::all();
    

    
    if (Auth::guard('teacher')->check()) {
        return Inertia::render('Teacher/Dashboard', [
            'posts' => $posts,
            'comments' =>$comments,
        ]);
    }
    return Inertia::render('Dashboard', [
        'posts' => $posts,
        'comments' =>$comments,
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
            $username = Teacher::find($user_id)->name;
        } elseif (Auth::guard('web')->check()) {
            // The authenticated user is a student
            $userType = 'user';
            $user_id = Auth::guard('web')->id();
            $username = User::find($user_id)->name;
        } else {
            // Handle other user types or scenarios
            abort(403, 'Unauthorized');
        }

        $path =  $request->file('image')->store('images','public');


       $post =  Post::create([
            'content' => $request->input('content'),    
            'user_type' => $userType,
            'user_id' =>$user_id,   
            'username' =>$username,   
            'image' => $path,
        ]);
        $post->save();
        if($this->checkUser() == 'teacher'){
        return redirect(RouteServiceProvider::TEACHER_HOME);
        }
        elseif($this->checkUser() == 'admin'){
            return redirect(RouteServiceProvider::ADMIN_HOME);
        }
        elseif($this->checkUser() == 'user'){
            return redirect(RouteServiceProvider::HOME);
        }
        else {
            abort(403, 'Unauthorized');
        }

    }

    public function like(Post $post)
    {
        if (Auth::guard('teacher')->check()) {
            // The authenticated user is a teacher
            $user_id = Auth::guard('teacher')->id();
        } elseif (Auth::guard('web')->check()) {
            // The authenticated user is a student
            $user_id = Auth::guard('web')->id();
        } else {
            // Handle other user types or scenarios
            abort(403, 'Unauthorized');
        }

        if (!$post->likes()->where('user_id', $user_id)->exists()) {
            $post->likes()->create(['user_id' => $user_id]);
            $post->increment('likes_count');
        }

        return redirect()->back(); // Redirect back to the post page
    }

    public function comment( Request $request)
    {
        // dd($request);   
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        if (Auth::guard('teacher')->check()) {
            // The authenticated user is a teacher
            $user_id = Auth::guard('teacher')->id();
            $username = Teacher::find($user_id)->name;
        } elseif (Auth::guard('web')->check()) {
            // The authenticated user is a student
            $user_id = Auth::guard('web')->id();
            $username = User::find($user_id)->name;
        } else {
            // Handle other user types or scenarios
            abort(403, 'Unauthorized');
        }

       $comment = Comment::create([
            'user_id' => $user_id,
            'username' => $username,
            'content' => $request->input('comment'),
            'post_id' => $request->input('postId'),
        ]);
        $comment->save();
        $post = Post::find($request->input('postId'));
        $post->increment('comments_count');

        return redirect()->back(); // Redirect back to the post page
    }
}
