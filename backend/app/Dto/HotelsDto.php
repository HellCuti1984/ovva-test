<?php

namespace App\Dto;

class HotelsDto
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
        string     $description,
        float|null $geo_lat,
        float|null $geo_lon
    )
    {
        $this->name = $name;
        $this->address = $address;
        $this->description = $description;
        $this->geo_lat = $geo_lat;
        $this->geo_lon = $geo_lon;
    }

    public function toArray(): array
    {
        return [
            "name" => $this->name,
            "address" => $this->address,
            "description" => $this->description,
            "geo_lat" => $this->geo_lat,
            "geo_lon" => $this->geo_lon,
        ];
    }
}
