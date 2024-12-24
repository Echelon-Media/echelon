import { motion } from "framer-motion";

const ShakeWhenVisible = ({ children,y }) => {
  return (
    <>
      <motion.div
        animate={["initial"]}
        whileHover={["grow", "shake"]} 
        variants={{
          grow: {
            scale: 1.1,
          },
          shake: {
            x: [0, -4, 0, 0, 4, -4, 4, 0],
            transition: {
              duration: 0.9, 
              repeat: Infinity, 
              repeatType: "loop", 
            },
          },
          initial: {
           
            rotate: [0, 0, 0, 0.5,0,0,0,0,0],
            transition: {
              duration: .9, 
              repeat: Infinity, 
              repeatType: "loop", 
            },
          },
        }}
      >
        {children}
      </motion.div>
      
    </>
  );
};

export default ShakeWhenVisible;
