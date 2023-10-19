import { Button, Typography } from "@mui/material";
import { useFetchAndLoad } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services";
import { UserAdapter } from "../../adapters";
import { AppStore } from '../../redux/store';
import { loggInUser } from "../../redux/slices/User/UserSlice";

const UserPage = () => {

    const userState = useSelector((state: AppStore) => state.user)

    return (
        <div>

            <Typography>PAGINA PRINCIPAL DE USUARIOS</Typography>
            <Typography>{JSON.stringify(userState.user)}</Typography>
        </div>
    );
}

export default UserPage;