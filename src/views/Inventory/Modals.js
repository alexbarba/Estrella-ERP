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
import { CustomSelect } from "components/CustomSelect";

import EventNoteIcon from "@material-ui/icons/EventNote";
import formStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
//DB ACCESS
import {
  UPDATE_RAW_MATERIAL,
  GET_NAME_PROVIDERS,
  GET_NAME_UOMS,
  CREATE_RAW_MATERIAL,
} from "./hocs";
import { useMutation, useLazyQuery } from "@apollo/client";

const Buttons = ({ children, props }) => {
  const { incrementOne } = props;
  return (
    <GridContainer alignItems="center" justify="center">
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
      <GridItem xs={2}>{children}</GridItem>
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
    </GridContainer>
  );
};

export const ChangeQuantityModal = ({ props }) => {
  const { modal, setModal, input, rawMaterial } = props;
  const [quantity, setQuantity] = useState(1);
  const [updateRawMaterial] = useMutation(UPDATE_RAW_MATERIAL);
  const [successAlert, setSuccessAlert] = useState(false);

  const title = input
    ? `Metiendo ${rawMaterial?.name}`
    : `Sacando ${rawMaterial?.name}`;
  const successMessage = input
    ? `Has introducido ${quantity + " " + rawMaterial?.name}`
    : `Has sacado ${quantity + " " + rawMaterial?.name}`;
  const updatedQuantity = input
    ? Number(quantity) + Number(rawMaterial?.quantity)
    : Number(rawMaterial?.quantity) - Number(quantity);

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
    name: rawMaterial?.name ? rawMaterial.name : "",
    quantity: rawMaterial?.quantity ? rawMaterial.quantity : 0,
    cost: rawMaterial?.cost ? rawMaterial.cost : 0,
    uom: {
      _id: rawMaterial?.uom?._id ? rawMaterial.uom._id : "",
      name: rawMaterial?.uom?.name ? rawMaterial.uom.name : "",
    },
    provider: {
      _id: rawMaterial?.provider?._id ? rawMaterial.provider._id : "",
      name: rawMaterial?.provider?.name ? rawMaterial.provider.name : "",
    },
  };

  const [newRawMaterial, setNewRawMaterial] = useState(initialState);
  const [updated, setUpdated] = useState([]);
  const updating = (newVariable) => {
    setNewRawMaterial({ ...newRawMaterial, ...newVariable });
    if (!updated.includes(...Object.keys(newVariable)))
      setUpdated([...updated, ...Object.keys(newVariable)]);
  };

  const mutation = rawMaterial._id ? UPDATE_RAW_MATERIAL : CREATE_RAW_MATERIAL;

  const [saveRawMaterial] = useMutation(mutation);
  const submitModal = () => {
    let input = Object.assign(
      {},
      ...updated.map((key) => {
        if (key === "cost") {
          return { [key]: Number(newRawMaterial[key]) };
        } else if (key === "uom" || key === "provider") {
          return { [key]: newRawMaterial[key]._id };
        }
        return { [key]: newRawMaterial[key] };
      })
    );
    if (rawMaterial?._id) {
      input._id = rawMaterial._id;
    }
    saveRawMaterial({
      variables: {
        input: input,
      },
    });
    setModal("Los cambios se han guardado.");
  };
  return (
    <Modal
      props={{
        title: "Materia Prima",
        modal: modal,
        closeModal: () => setModal(),
        submit: () => submitModal(),
      }}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <EventNoteIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Materia Prima</h4>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nombre"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "name",
                        value: newRawMaterial.name,
                        onChange: (e) =>
                          updating({ [e.target.name]: e.target.value }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Cantidad"
                      id="quantity"
                      formControlProps={{
                        fullWidth: false,
                      }}
                      inputProps={{
                        name: "quantity",
                        value: newRawMaterial.quantity,
                        onChange: (e) =>
                          updating({ [e.target.name]: Number(e.target.value) }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Costo"
                      id="cost"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "cost",
                        value: newRawMaterial.cost,
                        onChange: (e) =>
                          updating({ [e.target.name]: e.target.value }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <LazyProviders
                      props={{
                        selected: newRawMaterial.provider,
                        onChange: (_id) =>
                          updating({
                            provider: { _id: _id },
                          }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <LazyUOMs
                      props={{
                        selected: newRawMaterial.uom,
                        onChange: (_id) =>
                          updating({
                            uom: { _id: _id },
                          }),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Modal>
  );
};

const LazyProviders = ({ props }) => {
  const [getProviders, { data }] = useLazyQuery(GET_NAME_PROVIDERS);
  const { selected, onChange } = props;
  return (
    <CustomSelect
      props={{
        name: "Proveedor",
        onOpen: () => getProviders(),
        onChange: (_id) => onChange(_id),
        options: data ? data.providers : undefined,
        defaultSelected: selected,
      }}
    />
  );
};

const LazyUOMs = ({ props }) => {
  const [getUOMs, { data }] = useLazyQuery(GET_NAME_UOMS);
  const { selected, onChange } = props;
  return (
    <CustomSelect
      props={{
        name: "Presentación",
        onOpen: () => getUOMs(),
        onChange: (_id) => onChange(_id),
        options: data ? data.uoms : undefined,
        defaultSelected: selected,
      }}
    />
  );
};
