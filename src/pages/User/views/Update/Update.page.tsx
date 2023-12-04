import { useParams } from 'react-router-dom';
import { UserForm, useUser } from '../..';
import { CRUDActions, UserModel } from '../../../../models';
import { useState, useEffect } from 'react';
import { StyledCard } from '../../../../styled-components';
import { CustomLoader } from '../../../../components';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';

const UpdateUserPage = () => {
  const {id} = useParams();
  
  const [user, setUser] = useState<UserModel>();
  
  const {
    findUser,
  } = useUser();
  const currentUser = useSelector( (state: AppStore) => state.user )

  const loadUser = async() => {
    const user = await findUser(parseInt(id));
    setUser(user);
  }


  useEffect(() => {
    if(id === undefined)
      setUser(currentUser.user);
    else
      loadUser();
  },[])
  
  const render = !user
    ? <CustomLoader />
    : <UserForm user={user} action={CRUDActions.UPDATE} />

  return (
    <StyledCard sx={{ padding: 6 }} >  
      { render }
    </StyledCard>
  )
}

export default UpdateUserPage;
