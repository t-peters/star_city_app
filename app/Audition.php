<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audition extends Model
{
    protected $table = 'auditions';

    protected $fillable = ['name','description','date','sex','age','category','location','type'];
}
