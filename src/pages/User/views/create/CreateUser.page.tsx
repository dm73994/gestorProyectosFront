import { UserForm } from '../..';
import { StyledCard } from '../../../../styled-components';

const CreateUserPage = () => {
  return (
    <StyledCard sx={{ padding: 6 }} >
      <UserForm user={null} />
    </StyledCard>
  )
}

export default CreateUserPage;
