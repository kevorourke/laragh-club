import Image from "next/image";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_DOWNLOADS } from "../../graphql/queries";
import ReactMarkdown from "react-markdown";

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {data.map((download) => (
          <li
            key={download.attributes.url}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {download.attributes.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {download.attributes.description}
                </p>
              </div>
            </div>
            <a
              href={download.attributes.url}
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const client = new ApolloClient({
  uri: `${process.env.STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

async function getData() {
  const { data } = await client.query({
    query: GET_ALL_DOWNLOADS,
  });

  return data.downloads.data;
}
