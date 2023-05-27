import { getProduct, getProducts } from "@/service/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3;

export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름: ${params.slug}`,
  };
}

type Props = {
  params: {
    slug: string;
  };
};
export default async function PantsPage({ params: { slug } }: Props) {
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // 서버 파일에 있는 데이터 중 해당 제품의 정보를 찾아서 그걸 보여줌
  return (
    <div>
      <h1>{product.name} 제품 설명 페이지</h1>
      <Image
        src={`/images/${product.image}`}
        alt={product.name}
        width={300}
        height={300}
      />
    </div>
  );
}

/**
 * dynamic route에서 특정 경로에 대해서는
 * 페이지를 미리 만들고 싶다면
 * 그 경로를 미리 알려줄 때 사용하는 함수
 */
export async function generateStaticParams() {
  // 모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄 거임(SSG)
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.id,
  }));
}
