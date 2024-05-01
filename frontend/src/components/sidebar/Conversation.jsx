import React from "react";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conversation, lastIdx, emoji}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-violet-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-violet-500" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img 
                            src={conversation.profilePic}
                            alt="user avatar" 
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">
                            {conversation.fullName}
                        </p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>
            
            {!lastIdx && <did className="divider my-0 py-0 h-1"/>}
        </>
    );
};

export default Conversation;


//STARTER CODE SNIPPET
// import React from "react";

// const Conversation = () => {
//   return (
//     <>
//         <div className="flex gap-2 items-center hover:bg-violet-500 rounded p-2 py-1 cursor-pointer">
//             <div className="avatar online">
//                 <div className="w-12 rounded-full">
//                     <img src="https://icons.veryicon.com/png/o/miscellaneous/generic-icon-3/avatar-empty.png" alt="user avatar" />
//                 </div>
//             </div>

//             <div className="flex flex-col flex-1">
//                 <div className="flex gap-3 justify-between">
//                     <p className="font-bold text-gray-200">Phune</p>
//                     <span className="text-xl">😀</span>
//                 </div>
//             </div>
//         </div>
//         <div className="divider my-0 py-0 h-1"/>
//     </>
//   );
// };

// export default Conversation;