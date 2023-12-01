<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;
    protected $fillable = [
        'subject_id',
        'title',
        'description',
        'due_date',
        'class_id',
        'semester_id',
        'file',
        'teacher_id',
    ];
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function class()
    {
        return $this->belongsTo(MsitClass::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
