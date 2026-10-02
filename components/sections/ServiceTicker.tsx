import { Marquee } from "@/components/motion/Marquee";

const items = [
  "Car wash",
  "Detailing & polishing",
  "Ceramic coating",
  "Graphene coating",
  "Paint protection film",
  "Cooling film & tinting",
  "Wheel alignment & balancing",
  "Premium accessories",
  "Body kits",
  "Coffee shop",
  "Beauty salon",
];

export function ServiceTicker() {
  return (
    <div className="relative border-y border-line bg-black py-4 lg:py-5">
      <Marquee items={items} />
    </div>
  );
}
