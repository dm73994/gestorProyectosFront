import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { AuthInteface, UserModel, UsersRoles } from '../../../models';
import { useFetchAndLoad } from '../../../hooks';
import { getUser, getUsers } from '../../../services';
import { UserAdapter } from '../../../adapters';
import { useState, useEffect } from 'react';
import { changeUserState, getUsersByRol } from '../../../services/API/User.service';
import { useNavigate } from 'react-router-dom';
import { UserListFilterModel } from '..';


export const useUser = () => {
  const theme = useTheme();
  const userState: AuthInteface  = useSelector((state: AppStore) =>  state.user);
  const [usersList, setUsersList] = useState<UserModel[]>([])
  const {callEndpoint, loading} = useFetchAndLoad();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<UserListFilterModel>({});
    
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

  const getUsersRol = async(rol: UsersRoles) => {    
    try{
      // obtain arrray of users
      const response = await callEndpoint(getUsersByRol(rol));
            
      // adapt users to UserModel
      const usersAdapter: UserModel[] = response.data?.map((user) => {
        return UserAdapter(user);
      })

      setUsersList(usersAdapter);
    }catch(err){
      throw new Error(err.message);
    }
  }

  const findUser = async(userId: number) => {
    try{
      const {data: rawData} = await callEndpoint(getUser(userId));
      const user = UserAdapter(rawData);
      return user
    }catch(err){
      throw new Error(err.message);
    }
  }
    
  const onChangeUserState = async(userId: number) => {
    try{
      const {data: rawData} = await callEndpoint(changeUserState(userId));
      getUsersList();
      return rawData;
    }catch(err){
      throw new Error(err.message);
    }
  }

  // HANDLE NAVIGATION TO ROUTE: users/create
  const handleCreateUserNavigation = () => navigate('/users/create');
    
  // HANDLE NAVIGATION TO ROUTE: users/update/:id
  const handleUpdateUserNavigation = (id: number) => navigate(`/users/update/${id}`);

  /**
     * Handle filter change by updating the filter state 
     */
  const handleFilterIdChange = (filterId: number) => {
    setFilter({...filter, id: filterId});
  }
  const handleFilterNameChange = (filterName: string) => {
    setFilter({...filter, name: filterName});
  }
  const handleFilterUsernameChange = (filterUsername: string) => {
    setFilter({...filter, username: filterUsername});
  }
  const handleFilterStateChange = (filterState: boolean) => {
    setFilter({...filter, state: filterState});
  }

  return {
    theme,
    user: userState.user,
    getUsersList,
    getUsersRol,
    usersList,
    findUser,
    loading,
    onChangeUserState,
    handleUpdateUserNavigation,
    handleCreateUserNavigation,
    handleFilterIdChange,
    handleFilterNameChange,
    handleFilterUsernameChange,
    handleFilterStateChange,
    filter
  }
}