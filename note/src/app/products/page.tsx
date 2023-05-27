import { getProducts } from "@/service/products";
import Link from "next/link";
import MeowArticle from "@/components/MeowArticle";
import Image from "next/image";
import clothesImage from "../../../public/images/clothes.jpeg";

// export const revalidate = 3;

export default async function ProductsPage() {
  // throw new Error("error from ProductsPage"); // 6.4 에러 테스트용
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그것을 보여줌
  const products = await getProducts();

  return (
    <>
      <h3>Products Page</h3>
      <Image src={clothesImage} alt="clothes" priority />
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <MeowArticle />
    </>
  );
}
