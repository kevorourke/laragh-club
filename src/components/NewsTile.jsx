import Image from "next/image";

function NewsTile({ article }) {
  return (
    <article
      key={article.id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time
          dateTime={article.attributes.publishedAt}
          className="text-gray-500"
        >
          {article.attributes.publishedAt}
        </time>
        <a
          href={`news/${article.attributes.urlSlug}`}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {article.attributes.title}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={`news/${article.attributes.urlSlug}`}>
            <span className="absolute inset-0" />
            {article.attributes.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {article.attributes.description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        {article.attributes.image.data ? (
          <Image
            src={article.attributes.image.data.attributes.url}
            alt=""
            width="800"
            height="400"
            className="h-40 w-80  bg-gray-50"
          />
        ) : null}
      </div>
    </article>
  );
}

export default NewsTile;
