import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import modalStyles from "assets/jss/material-dashboard-pro-react/modalStyle.js";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";

const useModalStyles = makeStyles(modalStyles);
const useSweetAlertStyle = makeStyles(sweetAlertStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const Modal = ({ props, children }) => {
  const { title, modal, closeModal, submit } = props;
  const classes = useModalStyles();
  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal,
      }}
      open={modal}
      transition={Transition}
      keepMounted
      onClose={() => closeModal()}
      aria-labelledby="modal-slide-title"
      aria-describedby="modal-slide-description">
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}>
        <Button
          justIcon
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="transparent"
          onClick={() => closeModal()}>
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>{title}</h4>
      </DialogTitle>
      <DialogContent id="modal-slide-description" className={classes.modalBody}>
        {children}
      </DialogContent>
      <DialogActions
        className={classes.modalFooter + " " + classes.modalFooterCenter}>
        <Button onClick={() => closeModal()}>Cancelar</Button>
        <Button onClick={() => submit()} color="success">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const SweetSuccess = ({ props }) => {
  const { modal, setModal, msg } = props;
  const classes = useSweetAlertStyle();

  return (
    modal && (
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Operación satisfactoria!"
        onConfirm={() => setModal(false)}
        onCancel={() => setModal(false)}
        confirmBtnCssClass={classes.button + " " + classes.success}>
        {msg}
      </SweetAlert>
    )
  );
};
