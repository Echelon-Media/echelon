import { motion } from "framer-motion";

const WavyMotion = ({ children }) => {
  return (
    <motion.div
      animate={{
        x: [0, 20, -20, 20, -20, 0], // Horizontal movement
        y: [0, -10, 10, -10, 10, 0], // Vertical movement
      }}
      transition={{
        duration: 2, // Duration of one complete wave cycle
        repeat: Infinity, // Infinite loop
        ease: "easeInOut", // Smooth easing for the wave motion
      }}
    >
      {children}
    </motion.div>
  );
};

export default WavyMotion;
