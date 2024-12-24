import { motion } from "framer-motion";
import React from "react";

function SlideIn({ children,x }) {
  return (
    <motion.div
      initial={{ x: x }} 
      animate={{ x: 0 }} 
      transition={{
        type: "spring",
        stiffness: 50, 
        damping: 50, 
        duration: 1, 
      }}
      style={{zIndex:3000}}
    >
      {children}
    </motion.div>
  );
}

export default SlideIn;
