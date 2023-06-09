import { getProducts } from "@/service/products";
import Link from "next/link";
import MeowArticle from "@/components/MeowArticle";
import Image from "next/image";
import clothesImage from "../../../public/images/clothes.jpeg"; // "public/images/clothes.jpeg" 과 동일

export const revalidate = 0;

export default async function ProductsPage() {
  // throw new Error("error from ProductsPage"); // 6.4 에러 테스트용
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그것을 보여줌
  const products = await getProducts();

  console.log("products page"); // client side에서 실행되지 않음 but 만약 이 컴포넌트가 클라이언트 컴포넌트이고 useEffect가 아닌 이곳에 있었다면 서버에서도 실행 됨

  return (
    <>
      <h3>Products Page</h3>
      <Image
        src={clothesImage}
        alt="clothes"
        priority
        width={400}
        height={400}
      />
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
