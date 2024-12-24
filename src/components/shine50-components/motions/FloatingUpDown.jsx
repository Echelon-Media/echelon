import { motion } from "framer-motion";

const FloatingUpDown = ({ children, y }) => {
  return (
    <>
      <motion.div
        animate={["initial"]}
        whileHover={["grow"]}
        variants={{
          grow: {
            scale: 1.1,
          },
          rotate: {
            rotate: [null, -5, 5, 0],
            transition: {
              // delay,
              duration: 10,
              // repeat: Infinity,
              // repeatDelay: 0.2,
              // repeatType: "reverse"
            },
          },
          initial: {
            y: y,
            rotate: 0,
            transition: {
              duration: 2,
              repeat: Infinity,
              // repeatDelay: 0.2,
              repeatType: "reverse",
            },
          },
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default FloatingUpDown;
