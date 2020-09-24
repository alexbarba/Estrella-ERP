import { gql } from "@apollo/client";

//QUERYS
export const GET_RAW_MATERIALS = gql`
  {
    rawMaterials {
      _id
      name
      quantity
      cost
      uom {
        name
      }
      provider {
        name
      }
    }
  }
`;

export const GET_RAW_MATERIAL = gql`
  query RawMaterial($_id: ID!) {
    rawMaterial(_id: $_id) {
      quantity
    }
  }
`;

export const GET_PROVIDERS = gql`
  {
    providers {
      name
      _id
      phone
      email
      address
    }
  }
`;

//export const GET_PROVIDER = gql``;

export const GET_UOMS = gql`
  {
    uoms {
      _id
      name
      description
    }
  }
`;

//export const GET_UOM = gql``;

//MUTATIONS
export const UPDATE_RAW_MATERIAL = gql`
  mutation UpdateRawMaterial($input: UpdateRawMaterialInput!) {
    updateRawMaterial(input: $input) {
      _id
      name
      quantity
      cost
      provider {
        name
      }
      uom {
        name
      }
    }
  }
`;

export const CREATE_RAW_MATERIAL = gql`
  mutation CreateRawMaterial($input: CreateRawMaterialInput!) {
    createRawMaterial(input: $input) {
      name
      quantity
      cost
      provider {
        name
      }
      uom {
        name
      }
    }
  }
`;

export const DELETE_RAW_MATERIAL = gql`
  mutation DeleteRawMaterial($_id: ID!) {
    deleteRawMaterial(_id: $_id)
  }
`;

export const UPDATE_PROVIDER = gql`
  mutation UpdateProvider($input: UpdateProviderInput!) {
    updateProvider(input: $input) {
      name
      _id
      phone
      email
      address
    }
  }
`;

export const CREATE_PROVIDER = gql`
  mutation CreateProvider($input: CreateProviderInput) {
    createProvider(input: $input) {
      name
      _id
      phone
      email
      address
    }
  }
`;

export const DELETE_PROVIDER = gql`
  mutation DeleteProvider($_id: ID!) {
    deleteProvider(_id: $_id)
  }
`;

export const UPDATE_UOM = gql`
  mutation CreateUoM($input: UpdateUoMInput) {
    updateUoM(input: $input) {
      name
      _id
      description
    }
  }
`;

export const CREATE_UOM = gql`
  mutation CreateUoM($input: CreateUoMInput) {
    createUoM(input: $input) {
      name
      _id
      description
    }
  }
`;

export const DELETE_UOM = gql`
  mutation DeleteUoM($_id: ID!) {
    deleteUoM(_id: $_id)
  }
`;
