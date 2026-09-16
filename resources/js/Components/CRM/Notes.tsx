import { router, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export type Note = {
    id: number;
    body: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    notes: Note[];
    storeUrl: string;
};

export default function Notes({ notes, storeUrl }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        body: "",
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(storeUrl, {
            preserveScroll: true,
            onSuccess: () => reset("body"),
        });
    }

    function destroy(note: Note) {
        if (!window.confirm("Delete this note?")) {
            return;
        }

        router.delete(`/notes/${note.id}`, {
            preserveScroll: true,
        });
    }

    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
            <form onSubmit={submit} className="mt-5">
                <textarea
                    value={data.body}
                    onChange={(event) => setData("body", event.target.value)}
                    rows={4}
                    placeholder="Add a note..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {errors.body && (
                    <p className="mt-1 text-sm text-red-600">{errors.body}</p>
                )}
                <div className="mt-3 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? "Adding..." : "Add Note"}
                    </button>
                </div>
            </form>

            <div className="mt-6 space-y-4">
                {notes.length === 0 && (
                    <p className="text-sm text-gray-500">No notes yet.</p>
                )}
                {notes.map((note) => (
                    <article
                        key={note.id}
                        className="rounded-xl border border-gray-200 p-4"
                    >
                        <p className="whitespace-pre-wrap text-sm text-gray-900">
                            {note.body}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-4">
                            <div className="text-xs text-gray-500">
                                <span>{note.user?.name ?? "Unknown user"}</span>
                                {" · "}
                                <span>
                                    {new Intl.DateTimeFormat("en", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    }).format(new Date(note.created_at))}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => destroy(note)}
                                className="text-xs font-medium text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
