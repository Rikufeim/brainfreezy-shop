import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ArcticBackground from "@/components/ArcticBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020C18] relative">
      <ArcticBackground />
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
        <p className="mb-4 text-xl text-white/70">Oops! Page not found</p>
        <a href="/" className="text-white underline hover:text-white/80">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
