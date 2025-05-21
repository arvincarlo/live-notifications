export async function createRequest(data: any) {
    const response = await fetch("https://localhost:3002/requests/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data
        })
    });

    return response.json();
}