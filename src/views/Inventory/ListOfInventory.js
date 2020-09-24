import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { useQuery } from "@apollo/client";
import { GET_RAW_MATERIALS } from "./hocs";

import ReactTable from "components/ReactTable/ReactTable.js";
import { ChangeQuantityModal, RawMaterialModal } from "./Modals";
import { SweetSuccess } from "./Modals";
const RawMaterialButtons = (
  handleQuantityModal,
  handleRawMaterialModal,
  setRawMaterialName
) => {
  return (
    <div className="actions-right">
      <Button
        justIcon
        round
        simple
        color="info"
        className="like"
        onClick={(rawMaterialName) => {
          handleQuantityModal(true);
          setRawMaterialName(rawMaterialName);
        }}>
        <AddIcon />
      </Button>

      <Button
        justIcon
        round
        simple
        color="warning"
        className="edit"
        onClick={() => handleRawMaterialModal()}>
        <Edit />
      </Button>

      <Button
        justIcon
        round
        simple
        color="danger"
        className="remove"
        onClick={(rawMaterialName) => {
          handleQuantityModal(false);
          setRawMaterialName(rawMaterialName);
        }}>
        <RemoveIcon />
      </Button>
    </div>
  );
};

export const ListOfInventory = () => {
  const { loading, error, data } = useQuery(GET_RAW_MATERIALS);
  //Estado para mostrar el modal de cambiar cantidad de material
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  //Este estado es para saber si estamos metiendo o sacando material
  const [inputRawMaterial, setInputRawMaterial] = useState(true);
  //Estado para mostrar el modal donde se editan las propiedades de alguna materia prima
  const [showRawMaterialModal, setShowRawMaterialModal] = useState(false);
  const [activeRawMaterial, setActiveRawMaterial] = useState({});

  const handleQuantityModal = (input) => {
    setShowQuantityModal(!showQuantityModal);
    if (!(input === undefined)) {
      console.log(input);
      setInputRawMaterial(input);
    }
  };

  const handleRawMaterialModal = () => {
    setShowRawMaterialModal(!showRawMaterialModal);
  };

  if (loading) return <p>Cargado...</p>;
  if (error) return <p>Error :(</p>;
  const content = data.rawMaterials.map((el) => {
    return {
      id: el._id,
      name: el.name,
      quantity: el.quantity,
      cost: el.cost,
      uom: el.uom?.name,
      provider: el.provider?.name,
      actions: RawMaterialButtons(
        (input) => handleQuantityModal(input),
        () => handleRawMaterialModal(),
        () => setActiveRawMaterial(el)
      ),
    };
  });

  return (
    <>
      <ChangeQuantityModal
        props={{
          modal: showQuantityModal,
          setModal: () => handleQuantityModal(),
          input: inputRawMaterial,
          rawMaterial: activeRawMaterial,
        }}
      />
      <RawMaterialModal
        modal={showQuantityModal}
        setModal={() => handleRawMaterialModal()}
      />
      <ReactTable
        columns={[
          {
            Header: "Producto",
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
