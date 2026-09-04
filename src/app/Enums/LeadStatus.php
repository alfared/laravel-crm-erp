<?php

namespace App\Enums;

enum LeadStatus: string
{
    case NEW = 'new';
    case CONTACTED = 'contacted';
    case QUALIFIED = 'qualified';
    case WON = 'won';
    case LOST = 'lost';

    public function label(): string
    {
        return match ($this) {
            self::NEW => 'New',
            self::CONTACTED => 'Contacted',
            self::QUALIFIED => 'Qualified',
            self::WON => 'Won',
            self::LOST => 'Lost',
        };
    }
}