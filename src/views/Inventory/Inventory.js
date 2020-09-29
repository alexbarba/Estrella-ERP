import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Store from "@material-ui/icons/Store";
import GroupWork from "@material-ui/icons/GroupWork";
import Assessment from "@material-ui/icons/Assessment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomTabs from "components/CustomTabs/CustomTabs";

import { ListOfRawMaterial } from "./ListOfRawMaterial";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

export default function ReactTables() {
  const classes = useStyles();
  const tabs = [
    {
      tabName: "Materia Prima",
      tabIcon: Store,
      tabContent: <ListOfRawMaterial />,
    },
    {
      tabName: "Proveedores",
      tabIcon: GroupWork,
      tabContent: <></>,
    },
    {
      tabName: "Unidades de Medida",
      tabIcon: Assessment,
      tabContent: <></>,
    },
  ];

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Materias Primas</h4>
          </CardHeader>
          <CardBody>
            <CustomTabs headerColor="primary" tabs={tabs} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
