import { Button, Grid } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'
import { AuthInteface, DetailsAnteproyecto, UserModel, UsersRoles } from '../../../../../models';
import { useEffect, useState } from 'react';
import { LittleUserCard, TableSelectUser } from '../../../../../components';
import { useUser } from '../../../..';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../../redux/store';
import { useFetchAndLoad } from '../../../../../hooks';
import { addEvaluatorsAnteproyectoPPB } from '../../../../../services/API/Anteproyexto';
import Swal from 'sweetalert2';


interface IFormEvaluatorProps {
  anteproyecto: DetailsAnteproyecto;
}


export interface evaluatorsForm {
    idJefedepartamento: number;
    evaluadores: number[];
    idAnteproyecto: string;
}

export const FormEvaluators = ({anteproyecto}: IFormEvaluatorProps) => {

  const {
    usersList,
    getUsersRol,
  } = useUser(); 

  const {callEndpoint} = useFetchAndLoad();

  const userState: AuthInteface = useSelector((state: AppStore) => state.user);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [formData, setFormData] = useState<evaluatorsForm>({
    idJefedepartamento: userState.user.id,
    evaluadores: null,
    idAnteproyecto: null
  })

  const [reviewers, setReviewers] = useState<UserModel[]>([]);
  
  const handleAddReviewer = (reviewer: UserModel) => {
    if(reviewers.length < 2){
      setReviewers([...reviewers, reviewer]);
    }
  }

  const handleRemoveEvaluator = (item: number) => {
    setReviewers(reviewers.filter((reviewer, index) => index !== item));
  }

  const handleAddEvaluators = async() => {
    try{
      const evaluators = reviewers.map(reviewer => reviewer.id);
      setFormData({
        ...formData,
        evaluadores: evaluators,
        idAnteproyecto: anteproyecto.id
      })

      await callEndpoint(addEvaluatorsAnteproyectoPPB(formData));
      
      Swal.fire({
        icon: 'success',
        title: 'Evaluadores asignados correctamente',
        showConfirmButton: false,
        timer: 2000
      })

    }catch(error){
      console.log(error);
    }
  }


  /** To load evaluadores */
  const handleLoadReviewers = async() => {
    await getUsersRol(UsersRoles.EVALUADOR);
  }
  useEffect(() => {
    handleLoadReviewers();
  }, [])


  return (
    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>


      <Grid container spacing={16}>
            
        <Grid item xs={12}>
          { !reviewers[0] && (

            <Button 
              onClick={() => setOpen1(true)}  
              variant='contained'
              color='info'
              startIcon={<PersonAdd />}
              fullWidth
            >
                Asignar evaluador uno (1)
            </Button>
          ) }

          {reviewers[0] && (
            <LittleUserCard 
              user={reviewers[0]} 
              title={'Evaluador (1)'} 
              isDelete 
              handleDelete={() => handleRemoveEvaluator(0)}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          { !reviewers[1] && (

            <Button 
              onClick={() => setOpen2(true)}  
              variant='contained'
              color='info'
              startIcon={<PersonAdd />}
              fullWidth
            >
                Asignar evaluador dos (2)
            </Button>
          ) }

          {reviewers[1] && (
            <LittleUserCard 
              user={reviewers[1]} 
              title={'Evaluador (2)'} 
              isDelete 
              handleDelete={() => handleRemoveEvaluator(1)}
            />
          )}
        </Grid>

        
      </Grid>   

      
      <Grid container spacing={4}>

        <Grid item xs={12} md={6}>
          <Button
            onClick={handleAddEvaluators}
            color='success'
            variant='contained'
            fullWidth
            disabled={reviewers.length < 2}
          >
            Guardar
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            onClick={() => {}}
            color='error'
            variant='contained'
            fullWidth
          >
            Cancelar
          </Button>
        </Grid>

      </Grid>       

      <TableSelectUser
        open={open1} 
        setOpen={setOpen1} 
        userList={usersList} 
        setSelectedUser={handleAddReviewer} 
      />

      <TableSelectUser
        open={open2} 
        setOpen={setOpen2} 
        userList={usersList} 
        setSelectedUser={handleAddReviewer} 
      />

    </form>
  )
}
