export async function createNotification(data) {
    console.table(data);
    // Send a POST request to the server with the request data
    try {
        const response = await fetch(`http://localhost:3001/notifications`, {
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