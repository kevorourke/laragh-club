const { gql } = require("@apollo/client");

const GET_ALL_POSTS = gql`
  query {
    newsArticles {
      data {
        id
        attributes {
          publishedAt
          title
          description
          urlSlug
        }
        __typename
      }
    }
  }
`;

const GET_ALL_SLUGS = gql`
  query {
    newsArticles {
      data {
        id
        attributes {
          urlSlug
        }
      }
    }
  }
`;

const GET_INDIVIDUAL_POST = gql`
  query ($slugUrl: String!) {
    newsArticles(filters: { urlSlug: { eq: $slugUrl } }) {
      data {
        attributes {
          title
          content
        }
      }
    }
  }
`;

export { GET_ALL_POSTS, GET_INDIVIDUAL_POST, GET_ALL_SLUGS };
