import { useState } from "react";
import { motion } from "framer-motion";

function Blink({ children,o }) {
  return (
    <motion.div
      animate={{ opacity: o }}
      transition={{
        duration: 0.4, 
        repeat: Infinity, 
        repeatType: "reverse", 
        rotate: 10,
      }}
      style={{ position: "absolute", zIndex: 60000 }}
    >
      {children}
    </motion.div>
  );
}

export default Blink;
