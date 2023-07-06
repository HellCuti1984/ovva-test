<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rooms extends Model
{
    use HasFactory;

    protected $cascadeDeletes = ['hotels_id'];

    protected $dates = ['deleted_at'];

    protected $table = 'rooms';

    protected $fillable = [
        'hotels_id',
        'number',
        'capacity',
        'price',
        'description'
    ];

    public function booking()
    {
        return $this->hasMany(Booking::class, 'rooms_id', 'id');
    }

    public function delete()
    {
        $this->booking()->delete();
        return $this->delete();
    }
}
