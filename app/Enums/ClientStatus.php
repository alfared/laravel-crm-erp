<?php

namespace App\Enums;

enum ClientStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case PROSPECT = 'prospect';
    case VIP = 'vip';
    case BLOCKED = 'blocked';

     public function label(): string
     {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive',
            self::PROSPECT => 'Prospect',
            self::VIP => 'VIP',
            self::BLOCKED => 'Blocked',
        };
     }
}