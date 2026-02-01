import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 bg-black p-8">
      <Button>Button</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="icon" size="icon" aria-label="Shop">
        <ShoppingBag />
      </Button>
    </div>
  );
}
