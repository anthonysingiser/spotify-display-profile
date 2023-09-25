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
    // TODO: Call Web API
}

function populateUI(profile) {
    // TODO: Update UI with profile data
}