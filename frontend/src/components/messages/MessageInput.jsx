import React from "react";
import { GrSend } from "react-icons/gr";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
        <div className="w-full relative">
            <input 
                type="text" 
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" 
                placeholder="Send a message"
            >            </input>
            
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
              <GrSend />
            </button>

        </div>
    </form>
    
  );
};

export default MessageInput;


//STARTER CODE SNIPPET
// import React from "react";
// import { GrSend } from "react-icons/gr";

// const MessageInput = () => {
//   return (
//     <form className="px-4 my-3">
//         <div className="w-full">
//             <input 
//                 type="text" 
//                 className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" 
//                 placeholder="Send a message"
//             >            </input>
            
//             <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
//               <GrSend />
//             </button>

//         </div>
//     </form>
    
//   );
// };

// export default MessageInput;