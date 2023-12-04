import { UserForm } from '../..';
import { CRUDActions } from '../../../../models';
import { StyledCard } from '../../../../styled-components';

const CreateUserPage = () => {
  return (
    <StyledCard sx={{ padding: 6 }} >
      <UserForm user={null} action={CRUDActions.CREATE} />
    </StyledCard>
  )
}

export default CreateUserPage;
