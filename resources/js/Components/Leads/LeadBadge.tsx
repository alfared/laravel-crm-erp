type BadgeType = "status" | "priority" | "source";

type Props = {
    type: BadgeType;
    value: string | null;
};

const styles: Record<BadgeType, Record<string, string>> = {
    status: {
        new: "bg-blue-100 text-blue-800",
        contacted: "bg-indigo-100 text-indigo-800",
        qualified: "bg-emerald-100 text-emerald-800",
        proposal: "bg-violet-100 text-violet-800",
        negotiation: "bg-amber-100 text-amber-800",
        won: "bg-green-100 text-green-800",
        lost: "bg-red-100 text-red-800",
    },

    priority: {
        low: "bg-gray-100 text-gray-700",
        medium: "bg-blue-100 text-blue-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800",
    },

    source: {
        website: "bg-cyan-100 text-cyan-800",
        referral: "bg-emerald-100 text-emerald-800",
        email: "bg-blue-100 text-blue-800",
        phone: "bg-purple-100 text-purple-800",
        social: "bg-pink-100 text-pink-800",
        advertising: "bg-yellow-100 text-yellow-800",
        event: "bg-orange-100 text-orange-800",
        partner: "bg-indigo-100 text-indigo-800",
        other: "bg-gray-100 text-gray-700",
    },
};

export default function LeadBadge({ type, value }: Props) {
    if (!value) {
        return <span className="text-gray-400">—</span>;
    }

    const className =
        styles[type][value.toLowerCase()] || "bg-gray-100 text-gray-700";

    const label = value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <span
            className={[
                "inline-flex items-center rounded-full px-2.5 py-1",
                "text-xs font-semibold",
                className,
            ].join(" ")}
        >
            {label}
        </span>
    );
}
