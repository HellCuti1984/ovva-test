<?php

namespace App\Dto;

class BookingDto
{
    /**
     * @var int
     */
    private $rooms_id;
    /**
     * @var string
     */
    private $customer_name;
    /**
     * @var string
     */
    private $customer_email;
    /**
     * @var string
     */
    private $start_date;
    /**
     * @var string
     */
    private $end_date;

    public function __construct(
        int    $rooms_id,
        string $customer_name,
        string $customer_email,
        string $start_date,
        string $end_date,
    )
    {
        $this->rooms_id = $rooms_id;
        $this->customer_name = $customer_name;
        $this->customer_email = $customer_email;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
    }

    public function toArray(): array
    {
        return [
            "rooms_id" => $this->rooms_id,
            "customer_name" => $this->customer_name,
            "customer_email" => $this->customer_email,
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
        ];
    }
}
