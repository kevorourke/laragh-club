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
          image {
            data {
              attributes {
                url
              }
            }
          }
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

const GET_ABOUT_CONTENT = gql`
  query {
    abouts {
      data {
        attributes {
          title
          description
          content
          gallery {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_DOWNLOADS = `
  query {
    downloads {
      data {
        attributes {
          url
          description
          title
        }
      }
    }
  }
`;

export {
  GET_ALL_POSTS,
  GET_INDIVIDUAL_POST,
  GET_ALL_SLUGS,
  GET_ABOUT_CONTENT,
  GET_ALL_DOWNLOADS,
};
