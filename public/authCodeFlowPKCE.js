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