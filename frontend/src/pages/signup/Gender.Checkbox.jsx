import React from "react";
import { GrSelect } from "react-icons/gr";

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className="flex">
        <div className="from-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                <span className="text-white label-text"> Male</span>
                <input type="checkbox" className="checkbox border-slate-300"
                    checked ={selectedGender === "male"}
                    onChange = {() => onCheckboxChange("male")}
                />
            </label> 
        </div>
        <div className="from-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                <span className="text-white label-text"> Female</span>
                <input type="checkbox" className="checkbox border-slate-300"
                    checked ={selectedGender === "female"}
                    onChange = {() => onCheckboxChange("female")}
                />
            </label> 
        </div>
    </div>
  );
};

export default GenderCheckbox;


//STARTER CODE FOR  THIS FILE
// import React from "react";

// const GenderCheckbox = () => {
//   return (
//     <div className="flex">
//         <div className="from-control">
//             <label className={"label gap-2 cursor-pointer"}>
//                 <span className="text-white label-text"> Male</span>
//                 <input type="checkbox" className="checkbox border-slate-300"/>
//             </label> 
//         </div>
//         <div className="from-control">
//             <label className={"label gap-2 cursor-pointer"}>
//                 <span className="text-white label-text"> Female</span>
//                 <input type="checkbox" className="checkbox border-slate-300"/>
//             </label> 
//         </div>
//     </div>
//   );
// };

// export default GenderCheckbox;