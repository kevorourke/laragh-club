import axios from "axios";
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from "../../../graphql/queries";

export default async function Page({ params }) {
  const data = await getData(params);
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          {data.title}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {data.description}
        </h1>
        <p className="mt-6 text-xl leading-8">{data.content}</p>
      </div>
    </div>
  );
}

async function generateStaticParams() {
  const response = await axios.post(`${process.env.STRAPI_URL}/graphql`, {
    query: GET_ALL_SLUGS,
  });
  const { data } = response.data;
  return data.newsArticles.data.map(
    (article = {
      slug: article.attributes.urlSlug,
    })
  );
}

async function getData(params) {
  try {
    const response = await axios.post(`${process.env.STRAPI_URL}/graphql`, {
      query: GET_INDIVIDUAL_POST,
      variables: { slugUrl: params.slug },
    });

    const { data } = response.data;

    return data.newsArticles.data[0].attributes;
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
}
