import Script from 'next/script'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <title>My Spotify Profile</title>
        </head>
        <body>
            <Script 
                src="script.js"
            />
            <h1>My Spotify Profile</h1>
            <section id="profile">
                <h2> Logged in as <span id="displayName"></span></h2>
                <span id="avatar"></span>
                <ul>
                    <li>User ID: <span id="id"></span></li>
                    <li>Email: <span id="email"></span></li>
                    <li>Spotify URI: <a id="uri" href="#"></a></li>
                    <li>Link: <a id="url" href="#"></a></li>
                    <li>Profile Image: <a id="imgUrl" href="#"></a></li>
                    <li>Country: <span id="country"></span></li>
                    <li>Followers: </li><span id="followers"></span>
                    <li>Product: </li><span id="product"></span>
                </ul>
            </section> 
        </body> 
        </html>
    ) 
}