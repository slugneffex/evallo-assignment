import Modal from "@mui/material/Modal";
import { motion, AnimatePresence } from "framer-motion";
function WithModal({
  children,
  isOpen,
  close,
  containerClassName = "",
  containerStyle = {},
}) {
  return (
    <Modal
      open={isOpen ? true : false}
      className="flex items-center justify-center"
      onClose={close}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className={`
            flex flex-col w-full max-w-[450px] max-h-[80%] overflow-y-auto no-scrollbar gap-3 bg-white text-text p-4 outline-none rounded-lg",
            ${containerClassName}
          `}
          style={containerStyle}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
}

WithModal.Head = function ({ close, title }) {
  return (
    <div className="flex justify-between items-start">
      {title && <h1 className="font-bold text-brand text-2xl mb-3">{title}</h1>}
      {close && (
        <img
          onClick={close}
          className="h-[24px] w-fit cursor-pointer"
          src="/close-2.svg"
          alt="close modal"
        />
      )}
    </div>
  );
};

WithModal.Btn = function ({ textColor, text, className = "", ...props }) {
  return (
    <button
      className={cn(
        `bg-brand w-fit text-white px-24 py-2 rounded-md self-center`,
        className
      )}
      {...props}
    >
      {text ?? "Add"}
    </button>
  );
};
export default WithModal;
