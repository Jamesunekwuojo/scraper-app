import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true); // Ensure menu is visible on larger screens
      } else {
        setIsMenuOpen(false); // Hide menu on small screens
      }
    };

    handleResize(); // Run once on mount to set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="relative p-4 bg-purple-900">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span className="text-2xl font-bold text-purple-400">
            BookScraper
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-purple-300 focus:outline-none z-20"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`
            ${isMenuOpen ? "block" : "hidden"}
            md:flex md:items-center md:space-x-4
            absolute md:relative top-full left-0 right-0 
            bg-purple-900 md:bg-transparent
            transition-all duration-300 ease-in-out
            md:opacity-100 md:translate-y-0 z-10
          `}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 p-2 md:p-0 ">
            <li>
              <Link
                to="/"
                className="text-purple text-center"
                style={{
                  display: "block",
                  color: "#D8B4FE", 
                  fontSize: "1.25rem",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#F3E8FF")} // 
                onMouseLeave={(e) => (e.target.style.color = "#D8B4FE")}
              >
                Home
              </Link>
            </li>
            <li>
              <HashLink
              
                to="/#about"
                style={{
                  display: "block",
                  color: "#D8B4FE", 
                  fontSize: "1.25rem",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#F3E8FF")} // 
                onMouseLeave={(e) => (e.target.style.color = "#D8B4FE")}
                className="block text-purple-300 hover:text-purple-100 text-center"
              >
                About
              </HashLink>
            </li>
            <li>
              <Link

                to="/book-search"
                className="block text-purple-300 hover:text-purple-100 text-center"
                style={{
                  display: "block",
                  color: "#D8B4FE", 
                  fontSize: "1.25rem",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#F3E8FF")} // 
                onMouseLeave={(e) => (e.target.style.color = "#D8B4FE")}
              >
                Book Search
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNav;
