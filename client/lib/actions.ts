import { toast } from "sonner";
const API_REQUEST_BASE_URL = process.env.NEXT_PUBLIC_API_REQUEST_BASE_URL || "http://localhost:3001";

export async function createRequest(data: any) {
    const now = new Date().toLocaleString();

    // Send a POST request to the server with the request data
    try {
        const response = await fetch(`${API_REQUEST_BASE_URL}/requests`, {
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

export async function createNotification(data: any) {
    const now = new Date().toLocaleString();

    // Send a POST request to the server with the request data
    try {
        const response = await fetch(`${API_REQUEST_BASE_URL}/notifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
}