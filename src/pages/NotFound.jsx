import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/gutenberg.css";

var NotFound = function() {
  var location = useLocation();

  useEffect(function() {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="notfound-container">
      <section className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Oops! Page not found.</p>
        <Link to="/" className="notfound-link">Return to Home</Link>
      </section>
    </main>
  );
};

export default NotFound;
