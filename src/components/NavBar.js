import React from "react";

const NavBar = ({  onHomeClick }) => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-3">
      <a
        className="navbar-brand fw-bold"
        href="#!"
        onClick={(e) => {
          e.preventDefault();
          onHomeClick();
        }}
      >
        MyStore
      </a>

      <div className="ms-auto d-flex align-items-center">
     
      </div>
    </nav>
  );
};

export default NavBar;
