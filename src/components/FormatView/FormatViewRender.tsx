import { useState } from 'react'
import { DetailsPropuesta, DetailsAnteproyecto } from '../../models';
import { Grid, Divider, Box } from '@mui/material';
import { FormatViewParticipants, FormatViewReviews, FormatViewState, FormatViewVersions } from '.';
import { DetailsReviewModel } from '../../pages/PropuestasGrado';

interface viewDataState {
    propuesta: DetailsPropuesta | null;
    anteproyecto: DetailsAnteproyecto | null;
}

interface componentsDataState {
  reviews: JSX.Element | null;
  versions: JSX.Element | null;
}


export const FormatViewRender = () => {

  const [viewData, setViewData] = useState<viewDataState>({
    propuesta: null,
    anteproyecto: null,
  })

  const [componentsData, setComponentsData] = useState<componentsDataState>({
    reviews: null,
    versions: null,
  });

  const addAnteproyecto = (anteproyecto: DetailsAnteproyecto) => {
    setViewData({
      ...viewData,
      anteproyecto,
    });
  }

  const addReviewComponent = (revisiones: DetailsReviewModel[]) => {
    setComponentsData({
      ...componentsData,
      reviews: <FormatViewReviews revisiones={revisiones} />,
    });
  };
  
  const addVersionsComponent = (anteproyecto: DetailsAnteproyecto) => {
    setComponentsData({
      ...componentsData,
      versions: <FormatViewVersions reviews={anteproyecto.reviews} />,
    });
  };

  const render = () => (
    <Box>
      {/* SECCION DE PARTICIPANTE */}
      <Grid container>
        <Grid container rowSpacing={2} >
          {viewData.anteproyecto !== null && (
            <FormatViewParticipants 
              director={viewData.anteproyecto.director} 
              estudiantes={viewData.anteproyecto.estudiantes} 
              codirector={viewData.anteproyecto.codirector}
              asesor={viewData.anteproyecto.asesor}
            />
          )}
          {viewData.propuesta !== null && (
            <FormatViewParticipants 
              director={viewData.propuesta.director} 
              estudiantes={viewData.propuesta.estudiantes} 
              codirector={viewData.propuesta.codirector} 
              asesor={viewData.anteproyecto.asesor}
            />
          )}
        </Grid>

        {/* SECCION DE ESTADO */}
        <Divider sx={{ mt: 2, mb: 2 }} />

        <Grid container mt={5}>
          {viewData.anteproyecto !== null && (
            <FormatViewState state={viewData.anteproyecto.state} date={viewData.anteproyecto.date} />
          )}
          {viewData.propuesta !== null && (
            <FormatViewState state={viewData.propuesta.avalado} date={viewData.propuesta.date} />
          )}
        </Grid>

        {/* REVIEWS */}
        <Grid container mt={5}>
          {componentsData.reviews}
        </Grid>

        <Grid container mt={5}>
          {componentsData.versions}
        </Grid>
      </Grid>
    </Box>
  )


  return {
    addAnteproyecto,
    addReviewComponent,
    addVersionsComponent,
    render,
    viewData,
  }
}
