//good

import logo from "./logo.svg";
import "./App.css";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports.js";
Amplify.configure(awsExports);

function App({ signOut, user }) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Hello React with AWS</h2>
                {user ? (
                    <>
                        <h3>éÑÇÕå†å¿ÇéùÇ¡ÇƒÇ¢Ç‹Ç∑ÅF{user.username}</h3>
                        <button onClick={signOut}>Sign out</button>
                    </>
                ) : (
                    <h3>å†å¿Ç™Ç†ÇËÇ‹ÇπÇÒ</h3>
                )}
            </header>
        </div>
    );
}

export default withAuthenticator(App);