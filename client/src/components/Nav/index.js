import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Book Search
      </a>
            <a className="navbar-brand" href="/books">
        search
      </a>
      <a className="navbar-brand" href="/saved">
        saved
      </a>
    </nav>
  );
}

export default Nav;
