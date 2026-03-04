import StarfieldBackground from "@/components/StarfieldBackground";

export default function ArcticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      <StarfieldBackground transparentBg />
    </div>
  );
}
