import { motion } from "framer-motion";

function Rotate({ children,right, top }) {
  return (
    <motion.div
      animate={{
        rotate: [ 40,360], // Rotate from 0 to 360 degrees
      }}
      transition={{
        duration: 40, // Duration of one full rotation
        repeat: Infinity, // Repeat indefinitely
        ease: "linear", // Constant speed
      }}
      style={{ position: "absolute", zIndex: 1000, marginRight:right, top:top }}
    >
      {children}
    </motion.div>
  );
}

export default Rotate;
