<?php

namespace App\Enums;

enum LeadSource: string
{
    case WEBSITE = 'website';
    case REFERRAL = 'referral';
    case EMAIL = 'email';
    case PHONE = 'phone';
    case SOCIAL = 'social';
    case ADVERTISING = 'advertising';
    case EVENT = 'event';
    case PARTNER = 'partner';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::WEBSITE => 'Website',
            self::REFERRAL => 'Referral',
            self::EMAIL => 'Email',
            self::PHONE => 'Phone',
            self::SOCIAL => 'Social',
            self::ADVERTISING => 'Advertising',
            self::EVENT => 'Event',
            self::PARTNER => 'Partner',
            self::OTHER => 'Other',
        };
    }
}