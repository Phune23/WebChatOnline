import React from "react";
import GenderCheckbox from "./Gender.Checkbox.jsx";

const SignUp = () => {
  return <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="text-3x1 font-semibold text-center text-gray-800 ">
        Sign Up
        <span className="text-violet-800"> WebChatOnline</span>
      </h1>
      <br/>
      <form>
            <div>
                <label className="label p-2">
                <span className="text-white text-base label-text">Full Name</span>
                </label>
                <input type="text" placeholder="tbs phu" className="w-full input input-bordered h-10"/>
            </div>

            <div>
                <label className="label">
                <span className="text-white text-base label-text">User Name</span>
                </label>
                <input type="text" placeholder="Phune" className="w-full input input-bordered h-10"/>
            </div>

            <div>
                <label className="label">
                <span className="text-white text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
            </div>

            <div>
                <label className="label">
                <span className="text-white text-base label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10"/>
            </div>

            {/*GENDER CHECKBOX GOES HERE*/}
            <GenderCheckbox />

            <a href="#" className="text-white text-sm hover:underline hover:text-violet-300 mt-2 inline-block">
                Already have an account?
            </a>
            
            <br/>
            <div>
                <button className="btn btn-block btn-sm mt-2 border border-slate-300">
                    Sign Up
                </button>
            </div>

        </form>

    </div>
  </div>;
};

export default SignUp;

//STARTER CODE  FOR THE SIGNUP COMPONENT
// import React from "react";
// import GenderCheckbox from "./Gender.Checkbox.jsx";

// const SignUp = () => {
//   return <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//     <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//       <h1 className="text-3x1 font-semibold text-center text-gray-800 ">
//         Sign Up
//         <span className="text-violet-800"> WebChatOnline</span>
//       </h1>
//       <br/>
//       <form>
//             <div>
//                 <label className="label p-2">
//                 <span className="text-white text-base label-text">Full Name</span>
//                 </label>
//                 <input type="text" placeholder="tbs phu" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//                 <label className="label">
//                 <span className="text-white text-base label-text">User Name</span>
//                 </label>
//                 <input type="text" placeholder="Phune" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//                 <label className="label">
//                 <span className="text-white text-base label-text">Password</span>
//                 </label>
//                 <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//                 <label className="label">
//                 <span className="text-white text-base label-text">Confirm Password</span>
//                 </label>
//                 <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10"/>
//             </div>

//             {/*GENDER CHECKBOX GOES HERE*/}
//             <GenderCheckbox />

//             <a href="#" className="text-white text-sm hover:underline hover:text-violet-300 mt-2 inline-block">
//                 Already have an account?
//             </a>
            
//             <br/>
//             <div>
//                 <button className="btn btn-block btn-sm mt-2 border border-slate-300">
//                     Sign Up
//                 </button>
//             </div>

//         </form>

//     </div>
//   </div>;
// };

// export default SignUp;