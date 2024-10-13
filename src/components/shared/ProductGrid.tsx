"use client";
import Image from "next/image";
import React, { useRef } from "react";

interface ScrollContainer extends HTMLDivElement {
  isDown: boolean;
  startX: number;
  scrollLeftStart: number;
}

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

// 상품 데이터 배열
const products: Product[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `상품${index + 1}`,
  price: `${(index + 1) * 10},000원`,
  imageUrl: "/images/car.jpg",
}));

export default function ProductGrid() {
  const scrollContainerRef = useRef<ScrollContainer | null>(null);

  const getScrollContainer = () =>
    scrollContainerRef.current as ScrollContainer;

  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = getScrollContainer();
    scrollContainer.isDown = true;
    scrollContainer.startX = e.pageX - scrollContainer.offsetLeft;
    scrollContainer.scrollLeftStart = scrollContainer.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    const scrollContainer = getScrollContainer();
    if (scrollContainer) {
      scrollContainer.isDown = false;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const scrollContainer = getScrollContainer();
    if (scrollContainer?.isDown) {
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - scrollContainer.startX) * 1.5;
      scrollContainer.scrollLeft = scrollContainer.scrollLeftStart - walk;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-x-auto whitespace-nowrap py-4 px-2 cursor-grab no-scrollbar select-none"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex ">
        {/* 두 행을 하나의 가로 스크롤 컨테이너에 포함 */}
        <div className="flex flex-col ">
          {/* 첫 번째 행 */}
          <div className="flex ">
            {products.slice(0, 15).map((product) => (
              <div key={product.id} className="w-48">
                <div className="border rounded-md p-4">
                  <div className="relative w-full h-56 pointer-events-none">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="mt-2 pointer-events-auto">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 두 번째 행 */}
          <div className="flex ">
            {products.slice(15, 30).map((product) => (
              <div key={product.id} className="w-48">
                <div className="border rounded-md p-4">
                  <div className="relative w-full h-56 pointer-events-none">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="mt-2 pointer-events-auto">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
