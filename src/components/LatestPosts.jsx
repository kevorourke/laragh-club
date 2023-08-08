import NewsTile from "./NewsTile";
import axios from "axios";
import { GET_ALL_POSTS } from "../graphql/queries";

async function getData() {
  try {
    const response = await axios.post(`${process.env.STRAPI_URL}/graphql`, {
      query: GET_ALL_POSTS,
    });

    const { data } = response.data;

    return data.newsArticles.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    return [];
  }
}

async function LatestPost({ limit }) {
  let posts = await getData();
  if (limit) {
    posts = posts.slice(0, 3);
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest News
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Latest news from around your club
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <NewsTile key={post.id} article={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestPost;
