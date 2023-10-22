import { UserForm } from "../..";
import { UserModel } from "../../../../models";

interface ICreateUserPageProps {
  user?: UserModel
}

const CreateUserPage = () => {
  return (
    <>
      <UserForm user={null} />
    </>
  )
}

export default CreateUserPage;
