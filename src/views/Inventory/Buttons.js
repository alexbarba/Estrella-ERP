import React from "react";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export const RawMaterialButtons = (
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
