import { useEffect, useRef, useState } from "react";

export default function Adscene() {
  const [isFixed, setIsFixed] = useState(false);
  const adRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      { threshold: 1.0, rootMargin: "0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          ref={containerRef}
          className="relative flex space-x-4 border p-4"
        >
          {/* Left side */}
          <div className="flex-1 bg-gray-100 p-4">Main Content {index + 1}</div>

          {/* Right side */}
          <div
            ref={adRef}
            className={`${
              isFixed ? "fixed top-0" : "sticky"
            } right-0 bg-blue-500 p-4 text-white`}
            style={{ width: "300px" }}
          >
            Ad Content {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
