const page = () => {
  return (
    <div>
      <div
        className="hero rounded-b-[60px] py-20"
        style={{
          backgroundImage: "url(/assets/banner-bg.jpg)",
        }}
      >
        <h2 className="text-xl text-white font-bold">Contact Us</h2>
      </div>
      <div className="min-h-screen w-full md:flex mt-10">
        {/* address */}
        <div className="md:w-1/2 p-4 m-4">
          <div className="bg-gray-200 rounded-xl p-4">
            <h2 className="text-lg text-red-500 font-semibold my-4 ">
              Contact Us
            </h2>{" "}
            <div className="py-2">
              <h2 className="text-lg text-black font-semibold">Address</h2>
              <p className="text-lg text-gray-500 font-semibold">
                Sunny Island beach, FL 83723, United Bangladesh
              </p>
            </div>
            <div className="py-2">
              <h2 className="text-lg text-black font-semibold">Phone</h2>
              <p className="text-lg text-gray-500 font-semibold">+898878787</p>
            </div>
            <div className="py-2">
              <h2 className="text-lg text-black font-semibold">Email</h2>
              <p className="text-lg text-gray-500 font-semibold">sdhh@.com</p>
            </div>
          </div>
        </div>
        {/* form */}
        <div className="md:w-1/2 p-4 m-4">
          <form noValidate="" action="" className="bg-gray-200 rounded-xl p-4">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstname" className="text-sm">
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="First name"
                  className="w-full rounded-md p-2 bg-white"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded-md p-2 bg-white"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md p-2 bg-white"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-sm">
                  Subject
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="subject"
                  className="w-full rounded-md p-2 bg-white"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Massage
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="write here"
                  className="w-full rounded-md p-2 bg-white"
                />
              </div>
            </div>

            <input
              type="submit"
              value="Send"
              className="btn btn-md mt-8 bg-red-500 border-0 text-white"
            />
          </form>
        </div>
      </div>
      {/* map */}
      <div className="mx-8 mb-20 p-4 rounded-lg bg-slate-500">
        <h2 className="text-white text-3xl p-10 text-center">for map</h2>
      </div>
    </div>
  );
};

export default page;
