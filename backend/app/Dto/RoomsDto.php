<?php

namespace App\Dto;

class RoomsDto
{
    /**
     * @var int
     */
    private $hotels_id;
    /**
     * @var int
     */
    private $number;
    /**
     * @var int
     */
    private $capacity;
    /**
     * @var float
     */
    private $price;
    /**
     * @var string
     */
    private $description;

    public function __construct(
        int    $hotels_id,
        int    $number,
        float  $price,
        int    $capacity,
        string $description,
    )
    {
        $this->hotels_id = $hotels_id;
        $this->number = $number;
        $this->capacity = $capacity;
        $this->price = $price;
        $this->description = $description;
    }

    public function toArray(): array
    {
        return [
            "hotels_id" => $this->hotels_id,
            "number" => $this->number,
            'capacity' => $this->capacity,
            "price" => $this->price,
            "description" => $this->description,
        ];
    }
}
