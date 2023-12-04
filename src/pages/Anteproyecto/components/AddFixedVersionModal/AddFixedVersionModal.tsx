import { Grid } from '@mui/material';
import { CustomModal } from '..';
import { FileUploader } from '../../../../components';
import { useState } from 'react';
import { useFetchAndLoad } from '../../../../hooks';
import { useParams } from 'react-router-dom';
import { addNewVersionAnteproyectoPPB } from '../../../../services/API/Anteproyexto';
import Swal from 'sweetalert2';

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export const AddFixedVersionModal = ({open, handleClose}: IProps) => {

  const {id} = useParams();
  const formatedId = String(id).replace('-', '.');

  const {callEndpoint} = useFetchAndLoad();
  const [uploadedFile, setUploadedFile] = useState<File>(null);

  const handleUploadFile = (file: File) => {
    setUploadedFile(file);
  }

  const handleAddFixedVersion = async() => {
    try{
      await callEndpoint( addNewVersionAnteproyectoPPB(formatedId, uploadedFile) )
      handleClose();

      Swal.fire({
        icon: 'success',
        title: 'Versión creada',
        text: 'Se ha creado una nueva versión del anteproyecto con las correcciones realizadas por el director.',
        timer: 1000,
      })
    }catch(error){
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al crear la nueva versión del anteproyecto.',
        timer: 1000,
      })
    }
  }

  return (
    <CustomModal 
      open={open} 
      props={{
        title: 'Agregar corección anteproyecto', 
        description: 'Esta acción creará una nueva versión del anteproyecto con las correcciones realizadas por el directoy, esto implica que pase el proceso de revisión nuevamente.'
      }} 
      handleClose={handleClose} 
      successFunction={handleAddFixedVersion} 
    >
      <Grid container spacing={2} >

        <Grid item xs={12} sx={{ height: '30rem', mt: 3, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <FileUploader setUploadedFile={handleUploadFile} uploadedFile={uploadedFile} />
        </Grid>

      </Grid>
    </CustomModal>
  )
}
