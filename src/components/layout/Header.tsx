"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-2/3 bg-gray-900  py-3 mx-auto shadow-md   top-0  z-1">
      <div className="  text-white">
        <div className="flex justify-between  w-full">
          {/* Logo */}
          <div>
            <Link href="/">
              <p className="text-xl ml-4 font-bold">MUSINSA</p>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex ">
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

      {/* Search Bar */}
      <div className="w-7/8 mx-4">
        <input
          type="text"
          placeholder="무신사 스탠다드 슈퍼세일 티징 특가"
          className="w-full p-2 rounded-md text-gray-900"
        />
      </div>

      {/* Navigation Links */}
      <nav className="w-7/8 mx-4 mt-4 bg-gray-800 py-2  text-white">
        <div className="flex items-center gap-3 pl-2">
          <Link href="/">
            <p className="hover:text-gray-400">추천</p>
          </Link>
          <Link href="/brand">
            <p className="hover:text-gray-400">브랜드</p>
          </Link>
          <Link href="/launch">
            <p className="hover:text-gray-400">발매</p>
          </Link>
          <Link href="/ranking">
            <p className="hover:text-gray-400">랭킹</p>
          </Link>
          <Link href="/sale">
            <p className="hover:text-gray-400">세일</p>
          </Link>
          <Link href="/super-sale">
            <p className="hover:text-gray-400">무텐 슈퍼세일</p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
