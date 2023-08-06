import Image from "next/image";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ABOUT_CONTENT } from "../../graphql/queries";
import ReactMarkdown from "react-markdown";

export default async function Page() {
  const data = await getData();
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          {data.title}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {data.description}
        </h1>

        <ReactMarkdown>{data.content}</ReactMarkdown>
        {data.gallery.data.map((item) => (
          <Image
            key={item.id}
            src={item.attributes.url}
            width="250"
            height="200"
          />
        ))}
      </div>
    </div>
  );
}

const client = new ApolloClient({
  uri: `${process.env.STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

async function getData() {
  const { data } = await client.query({
    query: GET_ABOUT_CONTENT,
  });
  return data.abouts.data[0].attributes;
}
