import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
    const[loading, setLoading] = useState(false);
    
    const signup = async ({fullName, userName, passWord, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, userName, passWord, confirmPassword, gender});
        if(!success) return;
        
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, userName, passWord, confirmPassword, gender}) 
            });

            const data = await res.json();
            console.log(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {loading, signup};
};

export default useSignup;

function handleInputErrors({fullName, userName, passWord, confirmPassword, gender}){
    if (!fullName || !userName || !passWord || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (passWord !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (passWord.length < 6) {
        toast.error("Passwords must bt least 6 characters");
        return false;
    }

    return true;
}