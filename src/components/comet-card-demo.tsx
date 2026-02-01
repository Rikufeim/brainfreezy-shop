import { CometCard } from "@/components/ui/comet-card";
import heroCard from "@/assets/hero-multiply-card.png";

export default function CometCardDemo() {
  return (
    <CometCard>
      <div
        className="my-6 flex w-80 md:w-[450px] cursor-pointer flex-col items-stretch rounded-[16px] border-0 p-0 md:my-12"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="relative w-full">
          <img
            loading="lazy"
            className="h-full w-full rounded-[16px] object-contain"
            alt="Multiply Card"
            src={heroCard}
            style={{
              filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
            }}
          />
        </div>
      </div>
    </CometCard>
  );
}
