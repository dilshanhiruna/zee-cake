"use client";

export default function Page() {
  // handle form submission
  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    fetch("http://localhost:5000/v1/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        if (data.message === "successful") {
          // save user to local storage
          localStorage.setItem("token", data.token);
          window.location.href = "/";
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        <form className="mt-4 space-y-4 w-96" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="
                Email address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
