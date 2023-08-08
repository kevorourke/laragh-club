import Image from "next/image";

function HomePageHeader({ bg }) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <Image
        src={bg}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Laragh United GAA
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Laragh United are a Gaelic football club from Laragh and Stradone,
          County Cavan in Ireland. They are affiliated to Cavan GAA.
        </p>
      </div>
    </div>
  );
}

export default HomePageHeader;
