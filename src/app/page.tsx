import { MainCarousel } from "@/components/shared/MainCarousel";
import ProductGrid from "@/components/shared/ProductGrid";

export default function Home() {
  return (
    <div className="w-2/3 h-2/3 m-auto">
      {" "}
      홈페이지 입니다 !
      <div>
        <MainCarousel />
        <ProductGrid />
      </div>
    </div>
  );
}
