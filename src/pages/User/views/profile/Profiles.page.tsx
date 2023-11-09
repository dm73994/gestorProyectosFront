import { CardContent, Grid } from '@mui/material';
import { useUser } from '../../hooks';
import { StyledCard } from '../../../../styled-components';
import { UserInfo } from '../../components';
import { UserActionsTabs } from '.';
import { theme } from '../../../../services';



const UserPage = () => {

  const {user} = useUser();

  return (
    <StyledCard sx={{ background: theme.palette.customs.main }} elevation={0} >
      <Grid container sx={{ height: '100%', widht: '100%', padding: '0 !important' }} spacing={4} >

        {/* PROFILE DATA */}
        <Grid item md={4} sm={1}>
          <StyledCard variant="elevation">
            <UserInfo user={user} />
          </StyledCard>
        </Grid>

        <Grid item md={8} sm={1} sx={{ height: '100%' }} >
          <StyledCard sx={{ }}>
            <CardContent>
              <UserActionsTabs user={user} />
            </CardContent>
          </StyledCard>
        </Grid>

      </Grid>
    </StyledCard>
  );
}

export default UserPage;