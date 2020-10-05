import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import formStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import { Modal } from "components/Modal";

export const EditModal = ({ props }) => {
  const classes = makeStyles(formStyle);
  const { modal, setModal, obj, columns, mutation, Icon, title } = props;

  const [updated, setUpdated] = useState([]);
  const updating = (newVariable) => {
    setNewObj({ ...newObj, ...newVariable });
    if (!updated.includes(...Object.keys(newVariable)))
      setUpdated([...updated, ...Object.keys(newVariable)]);
  };

  const [newObj, setNewObj] = useState(
    columns.reduce((result, { accessor }) => {
      result[accessor] = obj?.[accessor] ? obj[accessor] : "";
      return result;
    }, {})
  );

  const [save] = useMutation(mutation);
  const submitModal = () => {
    let input = Object.assign(
      {},
      ...updated.map((key) => {
        return { [key]: newObj[key] };
      })
    );
    if (obj?._id) {
      input._id = obj._id;
    }
    save({
      variables: {
        input: input,
      },
    });
    setModal("Los cambios se han guardado.");
  };

  return (
    <Modal
      props={{
        title: title,
        modal: modal,
        closeModal: () => setModal(),
        submit: () => submitModal(),
      }}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Icon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{title}</h4>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  {columns &&
                    columns.map(({ Header, accessor }) => {
                      return (
                        <GridItem xs={12} sm={12} md={6} key={accessor}>
                          <CustomInput
                            labelText={Header}
                            id={accessor}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              name: accessor,
                              value: newObj[accessor],
                              onChange: (e) =>
                                updating({ [accessor]: e.target.value }),
                            }}
                          />
                        </GridItem>
                      );
                    })}
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Modal>
  );
};
