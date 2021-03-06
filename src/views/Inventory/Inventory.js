import React from "react";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import GroupWork from "@material-ui/icons/GroupWork";
import Assessment from "@material-ui/icons/Assessment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import CustomTabs from "components/CustomTabs/CustomTabs";

import { RawMaterialTable } from "./RawMaterialTable";
import { InventoryTables } from "./InventoryTables";
import {
  GET_PROVIDERS,
  GET_UOMS,
  CREATE_PROVIDER,
  CREATE_UOM,
  UPDATE_PROVIDER,
  UPDATE_UOM,
} from "./hocs";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

export default function ReactTables() {
  return (
    <GridContainer>
      <GridItem xs={12}>
        <CustomTabs headerColor="primary" tabs={tabs} />
      </GridItem>
    </GridContainer>
  );
}

const providerColumns = [
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Teléfono",
    accessor: "phone",
  },
  {
    Header: "Dirección",
    accessor: "address",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Acciones",
    accessor: "actions",
  },
];

const uomColumns = [
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Descripción",
    accessor: "description",
  },
  {
    Header: "Acciones",
    accessor: "actions",
  },
];

const tabs = [
  {
    tabName: "Materia Prima",
    tabIcon: Store,
    tabContent: <RawMaterialTable />,
  },
  {
    tabName: "Proveedores",
    tabIcon: GroupWork,
    tabContent: (
      <InventoryTables
        props={{
          query: GET_PROVIDERS,
          columns: providerColumns,
          collectionName: "providers",
          updateMutation: UPDATE_PROVIDER,
          createMutation: CREATE_PROVIDER,
          Icon: GroupWork,
          modalTitle: "Proveedor",
        }}
      />
    ),
  },
  {
    tabName: "Unidades de Medida",
    tabIcon: Assessment,
    tabContent: (
      <InventoryTables
        props={{
          query: GET_UOMS,
          columns: uomColumns,
          collectionName: "uoms",
          updateMutation: UPDATE_UOM,
          createMutation: CREATE_UOM,
          Icon: Assessment,
          modalTitle: "Unidad de Medida",
        }}
      />
    ),
  },
];
