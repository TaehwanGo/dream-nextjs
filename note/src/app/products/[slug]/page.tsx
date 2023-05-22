import { getProduct, getProducts } from "@/service/products";
import { notFound } from "next/navigation";

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
export default function PantsPage({ params: { slug } }: Props) {
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  // 서버 파일에 있는 데이터 중 해당 제품의 정보를 찾아서 그걸 보여줌
  return <div>{product} 제품 설명 페이지</div>;
}

/**
 * dynamic route에서 특정 경로에 대해서는
 * 페이지를 미리 만들고 싶다면
 * 그 경로를 미리 알려줄 때 사용하는 함수
 */
export function generateStaticParams() {
  // 모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄 거임(SSG)
  const products = getProducts();
  return products.map((product) => ({
    slug: product,
  }));
}
