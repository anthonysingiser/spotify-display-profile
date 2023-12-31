const clientId = "2cc0776ce6a941cd97ec49ff53395e10";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    async function run() {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        console.log(profile)
        populateUI(profile);
    }
    run()
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", 
        headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
}

const populateUI = (profile) => {
    const { display_name, images, id, email, external_urls, uri, href, country, followers, product } = profile;
    document.getElementById("displayName").innerText = display_name;
    if (images[1]) {
        const profileImage = new Image(200, 200);
        profileImage.src = images[1].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = images[1].url;
        document.getElementById("imgUrl").href = images[1].url;
    }
    document.getElementById("id").innerText = id;
    document.getElementById("email").innerText = email;
    document.getElementById("uri").innerText = uri;
    document.getElementById("uri").href = external_urls.spotify;
    document.getElementById("url").innerText = href;
    document.getElementById("url").href = href;
    document.getElementById("country").innerText = country;
    document.getElementById("followers").innerText = followers.total;
    document.getElementById("product").innerText = product;
};

async function redirectToAuthCodeFlow(clientId) {
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

async function getAccessToken(clientId, code) {
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