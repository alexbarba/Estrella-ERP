import React, { useState } from "react";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { useQuery } from "@apollo/client";

import ReactTable from "components/ReactTable/ReactTable.js";
import { SweetSuccess } from "components/Modal";
import { EditModal } from "./EditModal";
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
  const { query, columns, collectionName, createMutation, updateMutation, Icon, modalTitle } = props;
  const { loading, error, data } = useQuery(query);
  // Estado para mostrar el modal donde se editan las propiedades de algun objeto
  const [showObjModal, setShowObjModal] = useState(false);
  // Estado para saber que objeto ha sido seleccionado para ser modificado
  const [activeObj, setActiveObj] = useState();
  // Estado para mostrar el modal de operacion exitosa
  const [successModal, setSuccessModal] = useState();

  const actionEdit = (obj) => {
    setActiveObj(obj);
    setShowObjModal(true);
  };

  const setModal = (submitMsg) => {
    setShowObjModal(false);
    setActiveObj(undefined);
    setSuccessModal(submitMsg);
  };

  if (loading) return <SpinnerLinear />;
  if (error) return <p>Error :(</p>;
  const content = data.[collectionName].map((obj) => {
    return {...columns.reduce((result, key) => {result[key.accessor] = obj.[key.accessor]
    return result}, {}), actions: EditButton(() => actionEdit(obj))}
    }     
  );

  return (
    <>
      {showObjModal && (
        <EditModal
        props={{
            modal: showObjModal,
            setModal: (submitMsg) => setModal(submitMsg),
            obj: activeObj,
            columns: columns.slice(0,-1) , 
            mutation: activeObj? updateMutation: createMutation, 
            Icon: Icon,
            title: modalTitle,
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
          <Button round color="primary" onClick={() => setShowObjModal(true)}>
            <AddIcon />
            Crear nuevo
          </Button>
        </GridItem>
      </GridContainer>
      <ReactTable columns={columns} data={content} />
    </>
  );
};
