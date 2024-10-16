"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  imageUrl: "/images/freeimg.jpg",
}));

export default function ProductGrid() {
  const scrollContainerRef = useRef<ScrollContainer | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startClickX, setStartClickX] = useState(0);
  const router = useRouter(); // 라우터 사용

  const getScrollContainer = (): ScrollContainer =>
    scrollContainerRef.current as ScrollContainer;

  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = getScrollContainer();
    scrollContainer.isDown = true;
    scrollContainer.startX = e.pageX - scrollContainer.offsetLeft;
    scrollContainer.scrollLeftStart = scrollContainer.scrollLeft;
    setStartClickX(e.pageX);
    setIsDragging(false);
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

      // 일정 거리 이상 이동하면 드래그로 간주
      if (Math.abs(e.pageX - startClickX) > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleClick = (e: React.MouseEvent, productId: number) => {
    if (!isDragging) {
      e.stopPropagation(); // 이벤트 버블링 방지
      // 클릭 시 상세페이지 이동
      router.push(`/product/${productId}`);
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
      <div className="flex">
        {/* 두 행을 하나의 가로 스크롤 컨테이너에 포함 */}
        <div className="flex flex-col">
          {/* 첫 번째 행 */}
          <div className="flex">
            {products.slice(0, 15).map((product) => (
              <div
                key={product.id}
                className="w-48"
                onMouseUp={(e) => handleClick(e, product.id)}
              >
                <div className="border rounded-md p-4">
                  <div className="relative w-full h-56 pointer-events-none">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="rounded-md object-cover"
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
          <div className="flex">
            {products.slice(15, 30).map((product) => (
              <div
                key={product.id}
                className="w-48"
                onMouseUp={(e) => handleClick(e, product.id)}
              >
                <div className="border rounded-md p-4">
                  <div className="relative w-full h-56 pointer-events-none">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="rounded-md object-cover"
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
