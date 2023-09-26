import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeFlowPKCE";

const clientId = "2cc0776ce6a941cd97ec49ff53395e10";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
}

function populateUI(profile) {
    // TODO: Update UI with profile data
}