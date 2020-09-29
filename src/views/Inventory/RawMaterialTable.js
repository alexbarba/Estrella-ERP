import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { useQuery } from "@apollo/client";
import { GET_RAW_MATERIALS } from "./hocs";

import ReactTable from "components/ReactTable/ReactTable.js";
import { SweetSuccess } from "components/Modal";
import { ChangeQuantityModal, RawMaterialModal } from "./RawMaterialModals";
import { SpinnerLinear } from "components/SpinnerLinear";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const RawMaterialButtons = (rawMaterialModalActions) => {
  return (
    <div className="actions-right">
      <Button
        justIcon
        round
        simple
        color="info"
        className="like"
        onClick={() => rawMaterialModalActions(0)}>
        <AddIcon />
      </Button>

      <Button
        justIcon
        round
        simple
        color="warning"
        className="edit"
        onClick={(rawMaterialName) =>
          rawMaterialModalActions(1, rawMaterialName)
        }>
        <Edit />
      </Button>

      <Button
        justIcon
        round
        simple
        color="danger"
        className="remove"
        onClick={(rawMaterialName) =>
          rawMaterialModalActions(2, rawMaterialName)
        }>
        <RemoveIcon />
      </Button>
    </div>
  );
};

export const RawMaterialTable = () => {
  const { loading, error, data } = useQuery(GET_RAW_MATERIALS);
  // Estado para mostrar el modal de cambiar cantidad de material
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  // Estado para saber si estamos metiendo o sacando material
  const [inputRawMaterial, setInputRawMaterial] = useState(true);
  // Estado para mostrar el modal donde se editan las propiedades de alguna materia prima
  const [showRawMaterialModal, setShowRawMaterialModal] = useState(false);
  // Estado para saber que materia prima ha sido seleccionada para ser modificada
  const [activeRawMaterial, setActiveRawMaterial] = useState();
  // Estado para mostrar el modal de operacion exitosa
  const [successModal, setSuccessModal] = useState();

  const rawMaterialModalActions = (rawMaterial, num) => {
    setActiveRawMaterial(rawMaterial);
    if (num === 0) {
      setShowQuantityModal(true);
      setInputRawMaterial(true);
    } else if (num === 1) {
      setShowRawMaterialModal(true);
    } else if (num === 2) {
      setShowQuantityModal(true);
      setInputRawMaterial(false);
    } else {
      setShowQuantityModal(false);
      setInputRawMaterial(false);
      setShowRawMaterialModal(false);
    }
  };

  const setModal = (modalNum, submitMsg) => {
    if (modalNum === 0) {
      setShowQuantityModal(false);
      setActiveRawMaterial({});
    } else if (modalNum === 1) {
      setShowRawMaterialModal(false);
      setActiveRawMaterial(undefined);
    }

    setSuccessModal(submitMsg);
  };

  if (loading) return <SpinnerLinear />;
  if (error) return <p>Error :(</p>;
  const content = data.rawMaterials.map((el) => {
    return {
      id: el._id,
      name: el.name,
      quantity: el.quantity,
      cost: el.cost,
      uom: el.uom?.name,
      provider: el.provider?.name,
      actions: RawMaterialButtons((num) => rawMaterialModalActions(el, num)),
    };
  });

  return (
    <>
      <ChangeQuantityModal
        props={{
          modal: showQuantityModal,
          setModal: (submitMsg) => setModal(0, submitMsg),
          input: inputRawMaterial,
          rawMaterial: activeRawMaterial,
        }}
      />

      {showRawMaterialModal && (
        <RawMaterialModal
          props={{
            modal: showRawMaterialModal,
            setModal: (submitMsg) => setModal(1, submitMsg),
            rawMaterial: activeRawMaterial,
          }}
        />
      )}

      {successModal && (
        <SweetSuccess
          props={{
            modal: successModal,
            setModal: () => setSuccessModal(),
            msg: successModal,
          }}
        />
      )}
      <GridContainer
        justify="flex-end"
        alignItems="flex-start"
        style={{ marginTop: 10, marginRight: 10, marginBottom: 10 }}>
        <GridItem>
          <Button
            round
            color="primary"
            onClick={() => setShowRawMaterialModal(true)}>
            <AddIcon />
            Crear nuevo
          </Button>
        </GridItem>
      </GridContainer>
      <ReactTable
        columns={[
          {
            Header: "Nombre",
            accessor: "name",
          },
          {
            Header: "Proveedor",
            accessor: "provider",
          },
          {
            Header: "Presentación",
            accessor: "uom",
          },
          {
            Header: "Cantidad",
            accessor: "quantity",
          },
          {
            Header: "Acciones",
            accessor: "actions",
          },
        ]}
        data={content}
      />
    </>
  );
};
