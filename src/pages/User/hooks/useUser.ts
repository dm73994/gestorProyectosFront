import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { AuthInteface, UserModel } from '../../../models';
import { useFetchAndLoad } from '../../../hooks';
import { getUsers } from '../../../services';
import { UserAdapter } from '../../../adapters';
import { useState } from 'react';


export const useUser = () => {
    const theme = useTheme();
    const userState: AuthInteface  = useSelector((state: AppStore) =>  state.user);
    const [usersList, setUsersList] = useState<UserModel[]>([])
    const {callEndpoint} = useFetchAndLoad();
    
    const getUsersList = async() => {    
        try{
            // obtain arrray of users
            const response = await callEndpoint(getUsers());
            
            // adapt users to UserModel
            const usersAdapter: UserModel[] = response.data?.map((user) => {
                return UserAdapter(user);
            })

            setUsersList(usersAdapter);
        }catch(err){
            throw new Error(err.message);
        }
    }

    return {
        theme,
        user: userState.user,
        getUsersList,
        usersList
    }
}