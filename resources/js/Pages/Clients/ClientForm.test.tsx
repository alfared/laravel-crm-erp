import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ClientForm from "./ClientForm";

describe("ClientForm", () => {
    it("renders all client fields", () => {
        render(
            <ClientForm
                data={{
                    name: "",
                    email: "",
                    phone: "",
                    company_id: "",
                    owner_id: "",
                    job_title: "",
                    department: "",
                    birthday: "",
                    preferred_language: "",
                    timezone: "",
                    status: "active",
                }}
                setData={() => {}}
                errors={{}}
                processing={false}
                statuses={[
                    {
                        value: "active",
                        label: "Active",
                    },
                ]}
                companies={[]}
                owners={[]}
                onSubmit={(e) => e.preventDefault()}
            />,
        );

        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Phone")).toBeInTheDocument();
        expect(screen.getByLabelText("Status")).toBeInTheDocument();
        expect(screen.getByLabelText("Company")).toBeInTheDocument();
        expect(screen.getByLabelText("Owner")).toBeInTheDocument();
        expect(screen.getByLabelText("Job Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Department")).toBeInTheDocument();
        expect(screen.getByLabelText("Birthday")).toBeInTheDocument();
        expect(screen.getByLabelText("Preferred Language")).toBeInTheDocument();
        expect(screen.getByLabelText("Timezone")).toBeInTheDocument();
    });
});
