<?php

namespace App\Dto;

class LoginDto
{
    /**
     * @var string
     */
    private $email;
    /**
     * @var string
     */
    private $password;

    public function __construct(
        string $email,
        string $password,
    )
    {
        $this->email = $email;
        $this->password = $password;
    }

    public function toArray(): array
    {
        return [
            "email" => $this->email,
            "password" => $this->password
        ];
    }
}
