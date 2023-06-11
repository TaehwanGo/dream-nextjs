import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface CategoriesProps {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
}
export default function Categories({
  categories,
  selected,
  onClick,
}: CategoriesProps) {
  // get query param
  const searchParams = useSearchParams();

  console.log('searchParams.get("category")', searchParams.get("category"));

  return (
    <section className="p-4 text-center">
      <h2 className="text-lg font-bold border-b border-sky-500 md-2">
        Categories
      </h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onClick(category)}
            className={`cursor-pointer hover:text-sky-500 ${
              category === searchParams.get("category") ? "text-sky-600" : ""
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}
