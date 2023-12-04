import { CustomModal } from '..';


interface IProps {
    open: boolean;
    handleClose: () => void;
}

export const AproveAnteproyectoModal = ({open, handleClose}: IProps) => {

  return (
    <CustomModal
      open={open} 
      props={{title: 'Aprobar anteproyecto', description: ''}} 
      handleClose={handleClose} 
      successFunction={() => {}} 
    >
      
    </CustomModal>
  )
}
