import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ActivitiesTimeline from "./ActivitiesTimeline";

describe("ActivitiesTimeline", () => {
    it("renders empty state", () => {
        render(<ActivitiesTimeline activities={[]} />);

        expect(screen.getByText("No activity yet.")).toBeInTheDocument();
    });

    it("renders activities", () => {
        render(
            <ActivitiesTimeline
                activities={[
                    {
                        id: 1,
                        type: "status_changed",
                        description: "Status changed: new → contacted",
                        meta: null,
                        created_at: "2026-09-18T10:00:00.000Z",
                        user: {
                            id: 1,
                            name: "Admin User",
                        },
                    },
                    {
                        id: 2,
                        type: "task_created",
                        description: "Task created: Follow up",
                        meta: null,
                        created_at: "2026-09-18T11:00:00.000Z",
                        user: null,
                    },
                ]}
            />,
        );

        expect(screen.getByText("Status Changed")).toBeInTheDocument();

        expect(
            screen.getByText("Status changed: new → contacted"),
        ).toBeInTheDocument();

        expect(screen.getByText("Task Created")).toBeInTheDocument();

        expect(screen.getByText("Task created: Follow up")).toBeInTheDocument();

        expect(screen.getByText("by Admin User")).toBeInTheDocument();
    });

    it("formats activity type for display", () => {
        render(
            <ActivitiesTimeline
                activities={[
                    {
                        id: 1,
                        type: "client_updated",
                        description: "Client profile updated",
                        meta: null,
                        created_at: "2026-09-18T10:00:00.000Z",
                        user: null,
                    },
                ]}
            />,
        );

        expect(screen.getByText("Client Updated")).toBeInTheDocument();
    });
});
