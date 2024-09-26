import Image from "next/image";

const Banner = () => {
  return (
    <div className="mb-8">
      <div
        className="hero rounded-b-[60px] md:py-20 py-12"
        style={{
          backgroundImage: "url(/assets/banner-bg.jpg)",
        }}>
        <div className="md:flex items-center justify-between flex-row-reverse container mx-auto md:my-12 mb-5">
          <div className="">
            <Image
              width={600}
              height={100}
              alt="banner logo"
              src={"/assets/courseui.png"}
              className="w-[1000px]"></Image>
          </div>
          <div className="md:text-left text-center content-info">
            <h2 className="text-lg text-white font-semibold">WELCOME TO</h2>
            <h1 className="md:text-8xl text-5xl uppercase font-black text-white">
              LEARN<span className=" text-primary">I</span>CA
            </h1>

            <p className="py-6 text-white md:w-[80%]">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn bg-red-400 text-white border-0">
              Explore Courses
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 md:-mt-20 bg-transparent">
        <div className="flex flex-col md:flex-row gap-10 justify-between w-8/12 md:w-10/12 lg:w-9/12 mx-auto">
          {[
            "/assets/flexibility.png",
            "/assets/support.png",
            "/assets/mayment.webp",
            "/assets/freebook.png",
          ].map((src, idx) => (
            <div key={idx} className="flex-1 h-full">
              <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center h-[200px]">
                <Image
                  width={100}
                  height={100}
                  src={src}
                  alt="icon"
                  className="shadow-lg p-4 bg-blue-500 rounded-full"
                />
                <div className="text-black font-semibold text-center pb-2 pt-4">
                  {idx === 0 && "FLEXIBILITY"}
                  {idx === 1 && "24/7 HELPLINE"}
                  {idx === 2 && "SECURE CHECKOUT"}
                  {idx === 3 && "FREE ACCESS"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
