import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from "../../../graphql/queries";

export default async function Page({ params }) {
  const data = await getData(params);
  return <div>My Post:{data.title}</div>;
}

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

async function generateStaticParams() {
  const { data } = await client.query({ query: GET_ALL_SLUGS });

  return data.newsArticles.data.map(
    (article = {
      slug: article.attributes.urlSlug,
    })
  );
}

async function getData(params) {
  const { data } = await client.query({
    query: GET_INDIVIDUAL_POST,
    variables: { slugUrl: params.slug },
  });

  return data.newsArticles.data[0].attributes;
}
