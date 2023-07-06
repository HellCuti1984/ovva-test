<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hotels extends Model
{
    use HasFactory;

    protected $table = 'hotels';

    protected $fillable = [
        'name',
        'users_id',
        'address',
        'description',
        'geo_lat',
        'geo_lon',
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Rooms::class, 'hotel_id', 'id');
    }
}
