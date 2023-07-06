<?php

namespace App\Dto;

class CitiesDto
{
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $address;
    /**
     * @var float
     */
    private $price;
    /**
     * @var string
     */
    private $description;
    /**
     * @var float|null
     */
    private $geo_lat;
    /**
     * @var float|null
     */
    private $geo_lon;

    public function __construct(
        string     $name,
        string     $address,
        float      $price,
        string     $description,
        float|null $geo_lat,
        float|null $geo_lon
    )
    {
        $this->name = $name;
        $this->address = $address;
        $this->price = $price;
        $this->description = $description;
        $this->geo_lat = $geo_lat;
        $this->geo_lon = $geo_lon;
    }

    public function toArray(): array
    {
        return [
            "name" => $this->name,
            "address" => $this->address,
            "price" => $this->price,
            "description" => $this->description,
            "geo_lat" => $this->geo_lat,
            "geo_lon" => $this->geo_lon,
        ];
    }
}
