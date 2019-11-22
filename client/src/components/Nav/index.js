import React from "react";

function Nav() {
    return <nav className="navbar sticky-top navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        News Search
      </a>
      <a className="navbar-brand" href="/saved">
        Saved Articles
      </a>
    </nav>

}

export default Nav;