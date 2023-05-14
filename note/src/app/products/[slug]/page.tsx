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
export default function PantsPage({ params }: Props) {
  if (params.slug === "nothing") {
    notFound();
  }
  return <div>Products/ {params.slug} Page</div>;
}

/**
 * dynamic route에서 특정 경로에 대해서는
 * 페이지를 미리 만들고 싶다면
 * 그 경로를 미리 알려줄 때 사용하는 함수
 */
export function generateStaticParams() {
  const products = ["pants", "shirts", "shoes"];
  return products.map((product) => ({
    slug: product,
  }));
}
