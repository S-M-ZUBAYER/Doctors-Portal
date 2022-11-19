import { useEffect, useState } from "react";

const useToken = email => {
    const [token, SetToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.ACCESS_TOKEN) {
                        localStorage.setItem('ACCESS_TOKEN', data.ACCESS_TOKEN)
                        SetToken(data.ACCESS_TOKEN)
                    }
                })
        }


    }, [email]);
    return [token];
}
export default useToken;