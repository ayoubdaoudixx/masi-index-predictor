import { Link, useLocation } from "react-router-dom";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Overview", path: "/overview" },
    { name: "Predict", path: "/predict" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MASI Predictor
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-black dark:text-white"
                    : "text-black/70 dark:text-white/70"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* GitHub Link */}
            <a
              href="https://github.com/ayoubdaoudixx/stock-spark-form"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
