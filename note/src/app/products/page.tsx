import { getProducts } from "@/service/products";
import Link from "next/link";
import styles from "./page.module.css";

// export const revalidate = 3;

export default async function ProductsPage() {
  // 서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그것을 보여줌
  const products = await getProducts();

  const res = await fetch("https://meowfacts.herokuapp.com", {
    next: {
      revalidate: 0, // 3 -> ISR, 0 -> SSR
    },
    cache: "no-store", // make it always fetch like SSR
  });
  const data = await res.json();
  const factText = data.data[0];

  return (
    <>
      <h3>Products Page</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <article className={styles.article}>{factText}</article>
    </>
  );
}
