import { getPostCategories } from "@/pages/api/api";
import { useEffect, useState } from "react";

const CategoryName = ({ className, categoryId }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await getPostCategories(categoryId);
        setCategory(data.name);
      } catch (error) {
        console.error("Error fetching category:", error);
        setCategory(error.message);
      }
    }

    fetchCategory();
  }, []);

  return <div className={className}>{category}</div>;
};

export default CategoryName;
