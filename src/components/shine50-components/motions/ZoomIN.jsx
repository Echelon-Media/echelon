import { motion } from "framer-motion";

function ZoomInFrame({ children }) {
  return (
    <motion.div
      style={{
        // overflow: "hidden",
        width: "auto", // Set the desired frame width
        height: "800px", // Set the desired frame height
        position: "relative",
        zIndex:"6000"
      }}
    >
      <motion.div
        initial="normal"
        animate="zoom"
        variants={{
          normal: { scale: 1.2 },
          zoom: {
            scale: [1.2, 1.2, 1.2], // Zoom in to 120% and then back to normal
            transition: {
              duration: 50, // Duration for one full zoom-in and out cycle
              repeat: Infinity, // Repeat the animation indefinitely
              ease: "easeInOut", // Smooth easing for the zoom effect
            },
          },
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          paddingTop: "10%",
          
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default ZoomInFrame;
