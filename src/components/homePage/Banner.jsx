import Image from "next/image";

const Banner = () => {
  return (
    <div className="mb-8 px-2">
      <div
        className="hero rounded-b-[60px] py-20"
        style={{
          backgroundImage: "url(/assets/banner-bg.jpg)",
        }}
      >
        <div className="pt-10 flex flex-col item-center lg:justify-between lg:flex-row-reverse mb-6 w-9/12 mx-auto">
          <div className="lg:w-1/2">
            <Image
              width={600}
              height={60}
              alt="banner logo"
              src={"/assets/courseui.png"}
              className="pl-0 ml-0"
            ></Image>
          </div>
          <div className="lg:w-1/2 text-left">
            <h2 className="text-lg text-white font-semibold">WELCOME TO</h2>
            <Image
              width={500}
              height={60}
              alt="banner logo"
              src={"/assets/bannerLogo.png"}
              className=""
            ></Image>
            <p className="py-6 text-white">
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
        <div className="flex flex-col md:flex-row gap-4 justify-between w-8/12 md:w-10/12 lg:w-9/12 mx-auto">
          <div>
            <div className="p-4 bg-white rounded-xl shadow-lg md:h-[170px]">
              <Image
                width={100}
                height={100}
                src="/assets/flexibility.png"
                alt="abdul_mazed"
                className="mx-auto shadow-lg p-4 bg-blue-500 rounded-full"
              ></Image>
              <div className="text-black font-semibold text-center pb-2">
                FLEXIBILITY
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 bg-white rounded-xl shadow-lg md:h-[170px]">
              <Image
                width={100}
                height={100}
                src="/assets/support.png"
                alt="abdul_mazed"
                className="mx-auto shadow-lg p-4 bg-sky-500 rounded-full"
              ></Image>
              <div className="text-black font-semibold text-center pb-2">
                24/7 HELPLINE
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 bg-white rounded-xl shadow-lg md:h-[170px]">
              <Image
                width={100}
                height={100}
                src="/assets/mayment.webp"
                alt="abdul_mazed"
                className="mx-auto shadow-lg p-4 bg-blue-500 rounded-full"
              ></Image>
              <div className="text-black font-semibold text-center pb-2">
                SECURE CHECKOUT
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 bg-white rounded-xl shadow-lg md:h-[170px]">
              <Image
                width={100}
                height={100}
                src="/assets/freebook.png"
                alt="abdul_mazed"
                className="mx-auto shadow-lg p-4 bg-blue-500 rounded-full"
              ></Image>
              <div className="text-black font-semibold text-center pb-2">
                FREE ACCESS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
