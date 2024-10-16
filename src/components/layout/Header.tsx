"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { MainCarousel } from "../shared/MainCarousel";
import ProductGrid from "../shared/ProductGrid";

const categories = [
  {
    name: "추천",
    component: (
      <>
        <MainCarousel />
        <ProductGrid />
      </>
    ),
  },
  { name: "브랜드", component: <div>브랜드 상품 목록</div> },
  { name: "발매", component: <div>발매 상품 목록</div> }, // Placeholder for "발매" content
  { name: "랭킹", component: <div>랭킹 상품 목록</div> }, // Placeholder for "랭킹" content
  { name: "세일", component: <div>세일 상품 목록</div> }, // Placeholder for "세일" content
  { name: "슈퍼세일", component: <div>슈퍼세일 상품 목록</div> }, // Placeholder for "슈퍼세일" content
];

const Header = () => {
  const [activeCategory, setActiveCategory] = useState<string>("추천");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const getLinkClass = (category: string) => {
    return category === activeCategory
      ? "text-gray-400 font-bold"
      : "hover:text-gray-400";
  };

  return (
    <div>
      <header className="w-2/3 bg-gray-900 py-3 mx-auto shadow-md top-0 z-1">
        <div className="text-white">
          <div className="flex justify-between w-full">
            <div>
              <Link href="/">
                <p className="text-xl ml-4 font-bold">MUSINSA</p>
              </Link>
            </div>

            <div className="flex">
              <div>
                <Link href="/auth/login">
                  <p className="hover:text-gray-400">알람</p>
                </Link>
              </div>
              <div className="pl-4 mr-4">
                <Link href="/cart">
                  <p className="hover:text-gray-400">장바구니</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-7/8 mx-4">
          <input
            type="text"
            placeholder="무신사 스탠다드 슈퍼세일 티징 특가"
            className="w-full p-2 rounded-md text-gray-900"
          />
        </div>

        {/* Category Navigation */}
        <nav className="w-7/8 mx-4 mt-4 bg-gray-800 py-2 text-white">
          <div className="flex items-center gap-3 pl-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={getLinkClass(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main content changes based on the active category */}
      <main className="w-2/3 h-2/3 m-auto">
        {categories.map((category) =>
          activeCategory === category.name ? (
            <div key={category.name}>{category.component}</div>
          ) : null
        )}
      </main>
    </div>
  );
};

export default Header;
