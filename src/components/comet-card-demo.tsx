import { CometCard } from "@/components/ui/comet-card";
import brainfreezyLogo from "@/assets/brainfreezy-logo.jpg";

export default function CometCardDemo() {
  return (
    <CometCard>
      <div className="relative w-80 md:w-[450px] cursor-pointer">
        <img
          loading="lazy"
          className="h-full w-full object-contain"
          alt="Brain Freezy Logo"
          src={brainfreezyLogo}
          style={{
            filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
          }}
        />
      </div>
    </CometCard>
  );
}
