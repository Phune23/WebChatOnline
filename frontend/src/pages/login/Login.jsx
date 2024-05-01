import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {

  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");

  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, passWord);
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-gray-800 ">
          Login
          <span className="text-violet-800"> WebChatOnline</span>
        </h1>
        <br/>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="label p-2">
                <span className="text-white text-base label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label className="label">
                <span className="text-white text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"
                  value={passWord}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Link to="/signup" className="text-white text-sm hover:underline hover:text-violet-300 mt-2 inline-block">
                {"Don't"} have an account?
            </Link>

            <div>
                <button className="btn btn-block btn-sm mt-2 border border-slate-300"
                  disabled={loading}
                >
                    {loading ? <span className="loading loading-spinner"></span> : "Login"}
                </button>
            </div>

        </form>

      </div>
    </div>
  );
};

export default Login;    


//STARTER CODE FOR THIS FILE
// import React from "react";

// const Login = () => {
//   return ( 
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3x1 font-semibold text-center text-gray-800 ">
//           Login
//           <span className="text-violet-700"> WebChatOnline</span>
//         </h1>
//         <br/>
//         <form>
//             <div>
//                 <lable className="lable p-2">
//                 <span className="text-white text-base label-text">Username</span>
//                 </lable>
//                 <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//                 <lable className="lable">
//                 <span className="text-white text-base label-text">Password</span>
//                 </lable>
//                 <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
//             </div>

//             <a href="#" className="text-white text-sm hover:underline hover:text-violet-300 mt-2 inline-block">
//                 {"Don't"} have an account?
//             </a>

//             <div>
//                 <button className="btn btn-block mt-2">
//                     Login
//                 </button>
//             </div>

//         </form>

//       </div>
//     </div>
//   );
// };

// export default Login;    