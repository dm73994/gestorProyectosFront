import { useParams } from "react-router-dom";
import { UserForm, useUser } from "../..";
import { UserModel } from "../../../../models";
import { useState, useEffect } from 'react';

const UpdateUserPage = () => {
    const {id} = useParams();
    const [user, setUser] = useState<UserModel>();
    const {
        findUser,
        loading
    } = useUser();
    console.log('user', id);

    const loadUser = async() => {
        const user = await findUser(parseInt(id));
        setUser(user);
    }

    useEffect(() => {
        loadUser();
    },[id])

    const render = user == undefined 
    ? <h1>Cargando...</h1>
    : <UserForm user={user} />

    return (
        <>  
            { render }
        </>
    )
}

export default UpdateUserPage;
