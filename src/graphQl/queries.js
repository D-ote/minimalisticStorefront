import { gql } from "@apollo/client";

export const GET_CATEGORIES_AND_CURRENCIES = gql`
  {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          type
          items {
            id
            value
          }
          id
          name
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
      }
    }
  }
`;

export const GET_CATEGORIES_QUERY = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          type
          items {
            id
            value
          }
          id
          name
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      description
      attributes {
        type
        items {
          id
          value
        }
        id
        name
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;
