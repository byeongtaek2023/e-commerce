"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

// Mock 데이터 - 실제로는 서버나 DB에서 받아올 수 있습니다.
const products: Product[] = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `상품${index + 1}`,
  price: `${(index + 1) * 10},000원`,
  imageUrl: "/images/freeimg.jpg",
}));

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const productId = parseInt(id);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Mock 데이터에서 제품 정보 가져오기
    const foundProduct = products.find((item) => item.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  if (!product) {
    return <div>제품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-2/3 h-2/3 m-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="relative w-full h-96 mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p className="text-2xl text-gray-700 mb-4">{product.price}</p>
      <p>이 제품에 대한 자세한 설명을 추가할 수 있습니다...</p>
    </div>
  );
}
