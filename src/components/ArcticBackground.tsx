export default function ArcticBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundColor: "#020C18",
        backgroundImage: [
          "radial-gradient(1400px 1000px at 50% 55%, rgba(200,245,255,0.75) 0%, rgba(120,205,235,0.42) 35%, rgba(40,130,185,0.18) 60%, rgba(5,30,60,0.0) 100%)",
          "radial-gradient(1200px 900px at 50% 100%, rgba(0,18,38,0.9) 0%, rgba(0,18,38,0.45) 55%, rgba(0,18,38,0.0) 100%)",
          "radial-gradient(1600px 900px at 50% 0%, rgba(0,90,140,0.35) 0%, rgba(0,90,140,0.0) 70%)",
          "radial-gradient(150% 150% at 50% 55%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)",
        ].join(","),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: "scale(1.08)",
        filter: "blur(12px)",
      }}
    />
  );
}
