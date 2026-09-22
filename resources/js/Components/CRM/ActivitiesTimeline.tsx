export type Activity = {
    id: number;
    type: string;
    description: string;
    meta: Record<string, unknown> | null;
    created_at: string;

    user: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    activities: Activity[];
};

function formatActivityType(type: string): string {
    return type
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function ActivitiesTimeline({ activities }: Props) {
    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Activity</h2>

            <div className="mt-6">
                {activities.length === 0 ? (
                    <p className="text-sm text-gray-500">No activity yet.</p>
                ) : (
                    <div className="space-y-0">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className="relative flex gap-4 pb-6 last:pb-0"
                            >
                                {index !== activities.length - 1 && (
                                    <div className="absolute left-[7px] top-4 h-full w-px bg-gray-200" />
                                )}

                                <div className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white bg-gray-400 ring-1 ring-gray-300" />

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span className="text-sm font-medium text-gray-900">
                                            {formatActivityType(activity.type)}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            {new Intl.DateTimeFormat("en", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            }).format(
                                                new Date(activity.created_at),
                                            )}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {activity.description}
                                    </p>

                                    {activity.user && (
                                        <p className="mt-1 text-xs text-gray-400">
                                            by {activity.user.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
