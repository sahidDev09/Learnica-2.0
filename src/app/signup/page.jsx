import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

function LoginPage() {
  return (
    <section className="px-4 py-10 min-h-[calc(100vh-150px)]">
      <div className="max-w-4xl mx-auto bg-secondary-light text-white p-8 rounded-2xl bg-cover bg-center"  style={{backgroundImage: `url('/assets/authentication_bgImage.png')`}}>
        <div className="max-w-sm">
          <header className="mb-6">
            <p className="text-lg">START FOR FREE</p>
            <h2 className="text-3xl md:text-4xl font-bold">Create new account<span className="text-primary">.</span> </h2>
          </header>

          <p>Already have an account? <Link href={'/login'} className="text-primary underline font-bold ml-2 hover:no-underline">Login</Link></p>

          {/* login with other service */}
          <div className="mt-4 flex gap-6">
            <button className="bg-white text-black px-3 py-2 rounded-md flex items-center gap-2">  
              <span className="text-xl"> <FaGoogle/> </span>
              <span>With Google</span>
            </button>

            <button className="bg-white text-black px-3 py-2 rounded-md flex items-center gap-2">  
              <span className="text-xl"> <FaGithub/> </span>
              <span>With Github</span>
            </button>
          </div>

          <hr className="my-4" />

          {/* form */}
          <form>
            <div className="flex gap-4">
              {/* input group */}
              <div className="bg-white text-black px-3 py-2 rounded-md mb-3 flex items-center flex-1">
                <label className="flex flex-col flex-1">
                  <span className="text-gray-500 text-sm">Name</span>
                  <input type="text" className="outline-none" placeholder="Your name" />
                </label>
              </div>

              {/* input group */}
              <div className="bg-white text-black px-3 py-2 rounded-md mb-3 flex items-center flex-1">
                <label className="flex flex-col flex-1">
                  <span className="text-gray-500 text-sm">Role</span>
                  <select className="p-1 mt-1">
                    <option value="student">student</option>
                    <option value="mentor">mentor</option>
                  </select>
                </label>
              </div>

            </div>

            <div className="bg-white text-black px-3 py-2 rounded-md mb-3 flex items-center">
              <label className="flex flex-col flex-1">
                <span className="text-gray-500 text-sm">Email</span>
                <input type="text" className="outline-none" placeholder="youremail@gmail.com" />
              </label>
              <span> <FaPeopleGroup className="text-xl"/> </span>
            </div>

            {/* input group */}
            <div className="bg-white text-black px-3 py-2 rounded-md mb-3 flex items-center">
              <label className="flex flex-col flex-1">
                <span className="text-gray-500 text-sm">Password</span>
                <input type="password" className="outline-none" placeholder="your password" />
              </label>
              <span> <RiLockPasswordFill className="text-xl"/> </span>
            </div>

            {/* input group */}
            <div className="bg-white text-black px-3 py-2 rounded-md mb-3 flex items-center">
              <label className="flex flex-col flex-1">
                <span className="text-gray-500 text-sm">Photo</span>
                <input type="text" className="outline-none" placeholder="your photo url" />
              </label>
            </div>


            <button type="submit" className="bg-primary text-white font-bold mt-2 px-4 py-2 rounded-full hover:opacity-80 transition-opacity">Sign up</button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default LoginPage;