import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-dashboard-pro-react/modalStyle.js";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

//DB ACCESS
import { UPDATE_RAW_MATERIAL } from "./hocs";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Buttons = ({ children, props }) => {
  const { incrementOne } = props;
  return (
    <GridContainer alignItems="center" justify="center">
      <GridItem>
        <Button
          round
          justIcon
          size="sm"
          color="primary"
          onClick={() => incrementOne(true)}>
          <AddIcon />
        </Button>
      </GridItem>
      <GridItem xs={2}>{children}</GridItem>
      <GridItem>
        <Button
          justIcon
          round
          size="sm"
          color="primary"
          onClick={() => incrementOne(false)}>
          <RemoveIcon />
        </Button>
      </GridItem>
    </GridContainer>
  );
};

export const ChangeQuantityModal = ({ props }) => {
  const { modal, setModal, input, rawMaterial } = props;
  const [quantity, setQuantity] = useState(1);
  const [updateRawMaterial] = useMutation(UPDATE_RAW_MATERIAL);

  const title = input
    ? `Metiendo ${rawMaterial.name}`
    : `Sacando ${rawMaterial.name}`;

  const updatedQuantity = input
    ? Number(quantity) + Number(rawMaterial.quantity)
    : Number(rawMaterial.quantity) - Number(quantity);

  const classes = useStyles();

  const incrementOne = (increment) => {
    if (increment) {
      setQuantity(Number(quantity) + 1);
    } else {
      if (!(quantity < 2)) {
        setQuantity(Number(quantity) - 1);
      }
    }
  };

  const closeModal = () => {
    setModal();
    setTimeout(() => {
      setQuantity(1);
    }, 2000);
  };

  const submitQuantity = () => {
    updateRawMaterial({
      variables: {
        input: {
          _id: rawMaterial._id,
          quantity: updatedQuantity,
        },
      },
    });
    closeModal();
  };

  return (
    <div>
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
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}>
          <Buttons
            props={{
              incrementOne: (value) => incrementOne(value),
              updatedQuantity: updatedQuantity,
            }}>
            <CustomInput
              inputProps={{
                placeholder: "Cantidad",
                autoFocus: true,
                value: quantity,
                type: "type",
                onChange: (e) => {
                  setQuantity(e.target.value);
                },
              }}
              id="quantity"
              formControlProps={{
                fullWidth: false,
              }}
            />
          </Buttons>
          <p>Existencia posterior: {updatedQuantity}</p>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}>
          <Button onClick={() => closeModal()}>Cancelar</Button>
          <Button onClick={() => submitQuantity()} color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const RawMaterialModal = () => <div></div>;
