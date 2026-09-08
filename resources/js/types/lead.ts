export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type LeadSource =
    | "website"
    | "referral"
    | "email"
    | "phone"
    | "social"
    | "advertising"
    | "event"
    | "partner"
    | "other";

export type LeadPriority = "low" | "medium" | "high" | "urgent";

export interface SelectOption {
    value: string;
    label: string;
}

export interface Owner {
    id: number;
    name: string;
}

export interface Company {
    id: number;
    name: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;

    status: LeadStatus;
    source: LeadSource | null;
    priority: LeadPriority;

    owner_id: number | null;
    company_id: number | null;

    owner?: Owner | null;
    company?: Company | null;

    archived_at: string | null;
    deleted_at: string | null;

    created_at: string;
    updated_at: string;
}
