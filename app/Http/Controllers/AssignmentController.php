<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Assignment;
use App\Models\Teacher;
use App\Models\Semester;
use App\Models\MsitClass;
use App\Models\Subject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class AssignmentController extends Controller
{
    public function index()
    {
        $assignments = Assignment::with(['subject', 'class', 'semester'])->get();

        return Inertia::render('Assignments/TeacherAssignmentIndex', [
            'assignments' => $assignments,
        ]);
    }

    public function create()
    {
        $subjects = Subject::all();
        $classes = MsitClass::all();
        $semesters = Semester::all();

        return Inertia::render('Assignments/TeacherAssignment', [
            'subjects' => $subjects,
            'classes' => $classes,
            'semesters' => $semesters,
        ]);
    }

    public function store(Request $request):RedirectResponse
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'class_id' => 'required|exists:classes,id',
            'semester_id' => 'required|exists:semesters,id',
            'file' => 'required|file|mimes:pdf', // Adjust file validation rules as needed
        ]);
        
        $teacher = Auth::guard('teacher');
        
        
        
        // Store the file in the storage/app/public/assignments directory
        $path = $request->file('file')->store('assignments','public');
        
        // Save the file path in the database
        $assignment =  Assignment::create([
            'subject_id' => $request->input('subject_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'due_date' => $request->input('due_date'),
            'class_id' => $request->input('class_id'),
            'semester_id' => $request->input('semester_id'),
            'teacher_id' => $teacher->id(),
            'file' => $path,    
        ]);
        // dd($request);
        $assignment->save();
        
        // dd($request);
        return Redirect::route('teacher.assignment.index');
    }
}
