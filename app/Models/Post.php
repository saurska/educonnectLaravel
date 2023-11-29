<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['content', 'user_type','image','user_id','username'];
    

    public function postable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        if ($this->user_type === 'user') {
            return $this->belongsTo(User::class, 'user_id');
        } else {
            return $this->belongsTo(Teacher::class, 'user_id');
        }
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

}


