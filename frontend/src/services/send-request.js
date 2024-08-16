export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    options.headers = { 'Content-Type': 'application/json' };

    if (payload) {
        options.body = JSON.stringify(payload);
    }
    try {
        console.log("Sending request:", url, options);
        const res = await fetch(`http://localhost:3001/${url}`, options);
        console.log("res: ",res)
        if (await res.ok) {
            return await res.json();
        } else {
            const errorText = await res.text();
            console.error(`Error response from server (${res.status}): ${errorText}`);
            throw new Error(`Request failed with status ${res.status}`);
        }
    } catch (err) {
        console.error("Request failed:", err);
        throw err;
    }
}
