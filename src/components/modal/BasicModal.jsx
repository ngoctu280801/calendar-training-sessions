import { Dialog, Slide } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import usePopup from "../../hooks/usePopup";

const BasicModal = ({
  open,
  handleClose = () => {},
  clickOutside = handleClose,
  fullWidth = false,
  padding = "40px",
  haveCloseBtn = false,
  handleCloseBtnClick = handleClose,
  haveCloseConfirm = false,
  wrapperClassName,
  closeBtnClass = "",
  children,
}) => {
  const { handleOpenPopup: openConfirmClose } = usePopup();

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={haveCloseConfirm ? openConfirmClose : clickOutside}
      TransitionComponent={Transition}
      fullWidth={fullWidth}
      maxWidth="lg"
      PaperProps={{
        style: {
          zIndex: 7,
          position: "relative",
          boxShadow: "none",
          padding: padding,
        },
      }}
    >
      <div className="relative bg-inherit">
        {haveCloseBtn ? (
          <div
            className={`p-2 rounded-full absolute -top-2 -right-2 cursor-pointer hover:bg-gray-100 ${closeBtnClass}`}
            onClick={haveCloseConfirm ? openConfirmClose : handleCloseBtnClick}
          >
            <CloseIcon />
          </div>
        ) : null}

        {haveCloseBtn ? (
          <div className={`mt-6 ${wrapperClassName}`}>{children}</div>
        ) : (
          children
        )}
      </div>
    </Dialog>
  );
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default BasicModal;
