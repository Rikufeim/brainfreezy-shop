import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const seamlessBackground = {
    background: `
      radial-gradient(ellipse at 20% 180vh, #00323440 0%, #00323418 20%, transparent 50%),
      radial-gradient(ellipse at 80% 150vh, #00000040 0%, #00000018 20%, transparent 50%),
      radial-gradient(ellipse at 50% 200vh, #0b0d5730 0%, #0b0d5712 25%, transparent 55%),
      radial-gradient(ellipse at 30% 170vh, #00151730 0%, #00151712 20%, transparent 45%),
      radial-gradient(ellipse at 20% 40%, #0b0d5740 0%, #0b0d5718 20%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, #00151740 0%, #00151718 20%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, #00000025 0%, #00000010 30%, transparent 65%),
      radial-gradient(circle at 30% 30%, #0b0d5725 0%, #0b0d5710 15%, transparent 35%),
      radial-gradient(circle at 70% 70%, #00151725 0%, #00151710 15%, transparent 35%),
      #000000
    `,
    filter: "brightness(1.6)",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative">
      {/* Seamless Background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={seamlessBackground} />
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
