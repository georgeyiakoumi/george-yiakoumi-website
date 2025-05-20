import { motion } from "framer-motion";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <motion.div
      className="spinner"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};

export default Spinner;