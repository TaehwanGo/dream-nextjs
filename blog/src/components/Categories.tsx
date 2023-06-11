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
  return (
    <section>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}
