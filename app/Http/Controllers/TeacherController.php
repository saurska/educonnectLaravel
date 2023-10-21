<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class TeacherController extends Controller
{
    public function index() :Response{
        return Inertia::render('Teacher/Register');
    }
}
