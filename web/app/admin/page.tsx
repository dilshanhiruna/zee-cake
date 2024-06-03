"use client";

export default function Page() {
  return (
    <div className=" p-28 flex mx-auto justify-center space-x-4">
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/cake"
      >
        Cake
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/customized-cakes"
      >
        Customized Cakes
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/workshops"
      >
        Workshops
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/tutorials"
      >
        Tutorials
      </a>
    </div>
  );
}
