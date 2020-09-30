import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { useQuery } from "@apollo/client";

import ReactTable from "components/ReactTable/ReactTable.js";
import { SweetSuccess } from "components/Modal";
//import { PropModal } from "./PropModal";
import { SpinnerLinear } from "components/SpinnerLinear";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const EditButton = (action) => {
  return (
    <div className="actions-right">
      <Button
        justIcon
        round
        simple
        color="warning"
        className="edit"
        onClick={() => action()}>
        <Edit />
      </Button>
    </div>
  );
};

export const InventoryTables = ({ props }) => {
  const { query, columns, name } = props;
  const { loading, error, data } = useQuery(query);
  // Estado para mostrar el modal donde se editan las propiedades de algun proveedor
  const [showPropModal, setShowPropModal] = useState(false);
  // Estado para saber que materia prima ha sido seleccionada para ser modificada
  const [activeProp, setActiveProp] = useState();
  // Estado para mostrar el modal de operacion exitosa
  const [successModal, setSuccessModal] = useState();

  const propEdit = (prop) => {
    setActiveProp(prop);
    setShowPropModal(true);
  };

  const setModal = (submitMsg) => {
    setShowPropModal(false);
    setActiveProp(undefined);
    setSuccessModal(submitMsg);
  };

  if (loading) return <SpinnerLinear />;
  if (error) return <p>Error :(</p>;
  const content = data.[name].map((prop) => {
    return {
      _id: prop._id,
      name: prop.name,
      phone: prop.phone,
      email: prop.email,
      address: prop.address,
      actions: EditButton(() => propEdit(prop)),
    };
  });

  return (
    <>
      {showPropModal && (
        <div
          props={{
            modal: showPropModal,
            setModal: (submitMsg) => setModal(submitMsg),
            prop: activeProp,
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
          <Button round color="primary" onClick={() => setShowPropModal(true)}>
            <AddIcon />
            Crear nuevo
          </Button>
        </GridItem>
      </GridContainer>
      <ReactTable columns={columns} data={content} />
    </>
  );
};
