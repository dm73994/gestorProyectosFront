import { useParams } from 'react-router-dom';
import { UserForm, useUser } from '../..';
import { UserModel } from '../../../../models';
import { useState, useEffect } from 'react';
import { StyledCard } from '../../../../styled-components';

const UpdateUserPage = () => {
  const {id} = useParams();
  const [user, setUser] = useState<UserModel>();
  const {
    findUser,
  } = useUser();

  const loadUser = async() => {
    const user = await findUser(parseInt(id));
    setUser(user);
  }

  useEffect(() => {
    loadUser();
  },[])

  const render = user == undefined 
    ? <h1>Cargando...</h1>
    : <UserForm user={user} />

  return (
    <StyledCard sx={{ padding: 6 }} >  
      { render }
    </StyledCard>
  )
}

export default UpdateUserPage;
