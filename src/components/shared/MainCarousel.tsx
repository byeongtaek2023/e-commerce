"use client";
import React from "react";
// import * as React from "react";
import Image from "next/image";
// import img from "@/public/images/car.jpg"
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";

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

export function MainCarousel() {
  return (
    <Carousel className="w-full m-auto   ">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id}>
            <div className=" p-1">
              <Card>
                <CardContent className="flex  flex-col aspect-square items-center  p-6">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="mt-4 text-center w-full">
                    <p className="font-semibold text-lg">{product.name}</p>
                    <p className="text-gray-500">{product.price}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
