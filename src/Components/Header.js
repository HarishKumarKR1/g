import React from "react";

export default function Header() {
  function reset() {
    window.location.reload(false);
  }
  return (
    <div>
      <nav className="header">
        <label onClick={reset}>Reset</label>
        <a href="https://www.geektrust.in/">geektrust</a>
      </nav>
    </div>
  );
}
