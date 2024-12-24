import { useEffect, useState } from "react";
import { getPostTypes } from "../pages/api/api";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

const PostTypes = () => {
  const [postTypes, setTypes] = useState([]);

  useEffect(() => {
    async function fetchPostTypes() {
      const data = await getPostTypes();

      if (Array.isArray(data)) {
        setTypes(data);
      } else {
        var newdata = [];
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          newdata.push(data[key]);
        });
        setTypes(newdata);
      }
    }

    fetchPostTypes();
  }, []);

  return (
    <>
      <h1>Post Types</h1>
      <div className={styles.grid}>
        {postTypes.map((type) => (
          <a
            href="#"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            key={type.id}
          >
            <h2 className={inter.className}>
              {type.name} <span>-&gt;</span>
            </h2>
          </a>
        ))}
      </div>
    </>
  );
};

export default PostTypes;
