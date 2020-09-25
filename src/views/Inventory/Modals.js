import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { Modal, SweetSuccess } from "components/Modal";

import EventNoteIcon from "@material-ui/icons/EventNote";
import formStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
//DB ACCESS
import { UPDATE_RAW_MATERIAL } from "./hocs";
import { useMutation } from "@apollo/client";

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
  const [successAlert, setSuccessAlert] = useState(false);

  const title = input
    ? `Metiendo ${rawMaterial.name}`
    : `Sacando ${rawMaterial.name}`;
  const successMessage = input
    ? `Has metido ${quantity + " " + rawMaterial.name}`
    : `Has sacado ${quantity + " " + rawMaterial.name}`;
  const updatedQuantity = input
    ? Number(quantity) + Number(rawMaterial.quantity)
    : Number(rawMaterial.quantity) - Number(quantity);

  const incrementOne = (increment) => {
    if (increment) {
      setQuantity(Number(quantity) + 1);
    } else {
      if (!(quantity < 2)) {
        setQuantity(Number(quantity) - 1);
      }
    }
  };

  const closeModal = (successMessage) => {
    setModal(successMessage);
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
    setSuccessAlert(true);
    closeModal(successMessage);
  };

  return (
    <div>
      {successAlert && (
        <SweetSuccess
          props={{
            modal: successAlert,
            setModal: (v) => setSuccessAlert(v),
            msg: successMessage,
          }}
        />
      )}
      <Modal
        props={{
          title: title,
          modal: modal,
          closeModal: closeModal,
          submit: () => submitQuantity(),
        }}>
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
      </Modal>
    </div>
  );
};

export const RawMaterialModal = ({ props }) => {
  const classes = makeStyles(formStyle);
  const { modal, setModal, rawMaterial } = props;
  const initialState = {
    _id: "",
    name: "",
    quantity: 0,
    cost: 0,
    uom: {},
    provider: {},
  };
  const [newRawMaterial, setNewRawMaterial] = useState({ ...rawMaterial });
  const closeModal = () => {
    setModal();
    setNewRawMaterial(initialState);
  };

  return (
    <Modal
      props={{
        title: "Materia Prima",
        modal: modal,
        closeModal: () => closeModal(),
        submit: () => {},
      }}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <EventNoteIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Materia Prima</h4>
            </CardHeader>
            <CardBody>
              <form>
                <CustomInput
                  labelText="Nombre"
                  id="name"
                  name="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    name: "name",
                    value: newRawMaterial.name,
                    onChange: (e) =>
                      setNewRawMaterial({
                        ...newRawMaterial,
                        [e.target.name]: e.target.value,
                      }),
                  }}
                />
                <Button color="rose">Submit</Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Modal>
  );
};
