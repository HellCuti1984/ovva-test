<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $cascadeDeletes = ['rooms'];

    protected $dates = ['deleted_at'];

    protected $table = 'booking';

    protected $fillable = [
        'rooms_id',
        'customer_name',
        'customer_email',
        'start_date',
        'end_date',
    ];
}
