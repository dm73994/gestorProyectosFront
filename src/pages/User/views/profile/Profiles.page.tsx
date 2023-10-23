import { CardContent, Grid } from "@mui/material";
import { useUser } from "../../hooks";
import { StyledCard } from "../../../../styled-components";
import { UserInfo } from "../../components";
import { UserActionsTabs } from ".";



const UserPage = () => {

    const {user, theme} = useUser();

    return (
        <Grid container sx={{ height: '100%', widht: '100%' }} spacing={4} >

            {/* PROFILE DATA */}
            <Grid item md={4} sm={1} >
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
    );
}

export default UserPage;