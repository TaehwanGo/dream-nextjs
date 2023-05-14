import Link from "next/link";

const products = ["pants", "shirts", "shoes"];

export default function ProductsPage() {
  return (
    <>
      <h3>Products Page</h3>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`/products/${product}`}>{product}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
