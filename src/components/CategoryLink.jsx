import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryLink = ({ categoryId, categoryColor }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategoryName() {
      try {
        const response = await fetch(
          `https://backend.echelon.lk/wp-json/wp/v2/categories/${categoryId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        setCategory(data);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    }

    fetchCategoryName();
  }, []);

  return (
    <>
      <Link href={"category/[slug]"} as={`category/${category.slug}`}>
        <div className="story-category " style={{ color: categoryColor }}>
          {category.name}
        </div>
      </Link>
    </>
  );
};

export default CategoryLink;
