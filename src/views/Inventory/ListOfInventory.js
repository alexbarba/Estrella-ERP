import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { RawMaterialButtons } from "./Buttons";
import ReactTable from "components/ReactTable/ReactTable.js";
import { GET_RAW_MATERIALS } from "./hocs";
import { ChangeQuantityModal, RawMaterialModal } from "./Modals";

export const ListOfInventory = () => {
  const { loading, error, data } = useQuery(GET_RAW_MATERIALS);
  //Estado para mostrar el modal de cambiar cantidad de material
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  //Este estado es para saber si estamos metiendo o sacando material
  const [inputRawMaterial, setInputRawMaterial] = useState(true);
  //Estado para mostrar el modal donde se editan las propiedades de alguna materia prima
  const [rawMaterialModal, setRawMaterialModal] = useState(false);
  const [activeRawMaterial, setActiveRawMaterial] = useState({});

  const handleQuantityModal = (input) => {
    setShowQuantityModal(!showQuantityModal);
    if (!(input === undefined)) {
      console.log(input);
      setInputRawMaterial(input);
    }
  };

  const handleRawMaterialModal = () => {
    setRawMaterialModal(!rawMaterialModal);
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
