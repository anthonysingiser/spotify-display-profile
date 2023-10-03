export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    const state = generateCodeVerifier(16);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams()
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append("state", state);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifier);

    try {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token } = await result.json();

        return access_token;

    } catch (error) {
        console.error(error);
        window.location.href = "/"
    }
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// export const refreshSpotifyToken = async (refresh_token) => {
//     const body = new URLSearchParams({
//         grant_type: "refresh_token" || "",
//         refresh_token: refresh_token,
//         client_id: SPOTIFY_CLIENT_ID || "",
//     });
//     try {
//         const response = await fetch("https://accounts.spotify.com/api/token", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: body,
//         });

//         return response.json();
//     } catch (err) {
//         console.log(err);
//     }
// };