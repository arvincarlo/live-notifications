import { toast } from "sonner";

export async function createRequest(data: any) {
    const now = new Date().toLocaleString();

    // Send a POST request to the server with the request data
    try {
        const response = await fetch("http://localhost:3001/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            toast("Failed to create request.", {
                description: now,
                action: {
                    label: "Try again",
                    onClick: () => console.log("Try again"),
                },
            })
            throw new Error("Failed to create request");
        }

        toast("Request created successfully!", {
            description: now,
            action: {
                label: "Okay",
                onClick: () => console.log("Okay"),
            },
        })

        return await response.json();
    } catch (error) {
        toast("An error occurred while creating the request.", {
            description: now,
            action: {
                label: "Try again",
                onClick: () => console.log("Try again"),
            },
        })
        throw error;
    }
}