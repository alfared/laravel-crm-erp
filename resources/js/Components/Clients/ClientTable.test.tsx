import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ClientTable from "@/Components/Clients/ClientTable";

describe("ClientTable", () => {
    it("renders clients", () => {
        render(
            <ClientTable
                clients={{
                    data: [
                        {
                            id: 1,
                            name: "John Smith",
                            email: "john.smith@example.com",
                            phone: "+420123456789",
                            status: "active",
                            job_title: "CTO",
                            department: "Engineering",
                            preferred_language: "en",
                            timezone: "Europe/Prague",
                            company: {
                                id: 1,
                                name: "Acme",
                            },
                            owner: {
                                id: 2,
                                name: "Admin",
                            },
                        },
                    ],
                    current_page: 1,
                    last_page: 1,
                    per_page: 10,
                    total: 1,
                    from: 1,
                    to: 1,
                    links: [],
                }}
            />,
        );

        expect(screen.getByText("John Smith")).toBeDefined();
        expect(screen.getByText("john.smith@example.com")).toBeInTheDocument();
        expect(screen.getByText("Acme")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
        expect(screen.getByText("CTO")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
    });
});
