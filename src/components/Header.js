import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import Hero from "./Hero";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider} from "../firebase";
import { useNavigate } from "react-router-dom";


function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithPopup(provider)
      .then(() => navigate("/channels"))
      .catch((error) => alert(error.message));
  };
  return (
    <>
    <header className="bg-discord_blue flex items-center justify-between py-0 px-6">
      <a href="/">
        <img
          src="https://clipground.com/images/discord-logo-white-4.png"
          className="w-32 h-14 object-contain"
          alt=""
        />
      </a>
      
      <div className="hidden lg:flex space-x-6 text-cyan-50 ">
        <a href="/" className="link">Download</a>
        <a href="/" className="link">Why Discord?</a>
        <a href="/" className="link">Nitro</a>
        <a href="/" className="link">Safety</a>
        <a href="/" className="link">Support</a>
        {/* <link className="link">Download</link>
        <link className="link">Why Discord</link>
        <link className="link">Nitro</link>
        <link className="link">Safety</link>
        <link className="link">Support</link> */}
      </div>
      <div className="flex space-x-4">
        <button className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
        onClick={!user ? signIn : () => navigate("/channels")}
        >
        {!user ? "Login" : "Open Discord"}
        </button>
        <MenuIcon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
    <Hero/>
    </>
  );
}

export default Header;
