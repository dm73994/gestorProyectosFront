import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Icon, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { deepPurple, green, red } from "@mui/material/colors";
import { Email, EmailOutlined, Badge, Circle, ManageAccounts } from "@mui/icons-material";
import { getInitialsName } from "../../../utils";
import { InfoText } from "../components/InfoText";
import { useUser } from "../hooks";

const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.customs.light,
    height: '100%',
    width: '100%',
}))

const UserPage = () => {

    const {user, theme} = useUser();

    return (
        <Grid container columns={{ sm: 1, md: 12}} sx={{ height: '100%', widht: '100%' }} spacing={4} >

            {/* PROFILE DATA */}
            <Grid item md={4} sm={1} >
                <StyledCard variant="elevation">
                    <CardContent>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Avatar alt="Image" sx={{ width: '7rem', height: '7rem', bgcolor: deepPurple[500] }} > {getInitialsName(user.name, user.lastname)} </Avatar>
                            <Typography variant="body1" sx={{ mt: 2 }} textAlign={'center'}>
                                {user.name} {user.lastname}
                            </Typography>
                            <Typography variant="caption" textAlign={'center'}>
                                @{user.username}
                            </Typography>
                        </Box>
                        
                        <Divider />

                        <Box>
                            <InfoText label={'Identificación'} data={`${user.id}`} icon={<Badge />} />
                            <InfoText label={'Email'} data={user.email} icon={<Email />} />
                            <InfoText label={'Estado'} data={user.state ? 'Activo' : 'Deshabilitado'} icon={<Circle sx={{ color: user.state ? green.A700 : red.A700 }}  />} />

                            <Box display={'flex'} flexDirection={'column'} justifyContent={'start'}>
                                <Typography variant="overline" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }} >
                                    <ManageAccounts />
                                    Roles
                                </Typography>
                                <Box display={'flex'} gap={1} pl={4} flexWrap={'wrap'}>
                                    {
                                        user.roles.map((role) => (
                                            <Box pl={2} pr={2} key={role.type} sx={{ background: '#89CFF0', borderRadius: '5px'  }}>
                                                <Typography textAlign={'center'} >
                                                    {role.type}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>

                        </Box>

                    </CardContent>
                </StyledCard>
            </Grid>

            <Grid item md={8} sm={1} sx={{ height: '100%' }} >
                <StyledCard sx={{ p: 2 }}>
                    <CardContent>
                        <Icon sx={{ p: 0 }}>
                            <Avatar alt="Image" > {getInitialsName(user.name, user.lastname)} </Avatar>
                        </Icon>
                    </CardContent>
                </StyledCard>
            </Grid>

        </Grid>
    );
}

export default UserPage;