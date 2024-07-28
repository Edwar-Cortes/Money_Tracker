import { Dialog } from "@mui/material";
import { createPortal } from "react-dom";

const Modal = ({ children, open, handleClose }) => {
  return createPortal(
    <Dialog onClose={handleClose} open={open} fullWidth={true}
    maxWidth={'sm'}>
      {children}
    </Dialog>,
    document.body
  );
};

export { Modal };
