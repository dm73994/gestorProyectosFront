import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { LoginModel, UserModel } from '../../../models';
import { defaultLoginValues, loginSchema } from '..';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosBackendAPI } from '../../../services/axios/backendAPI';
import { getUser } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore, useAppDispatch } from '../../../redux/store';
import { useFetchAndLoad } from '../../../hooks';
import { loggInUser } from '../../../redux/slices/User/UserSlice';
import { UserAdapter } from '../../../adapters';
import { getLogin } from '../../../redux';




export const useLogin = () => {
    const theme = useTheme();
    const {loading, callEndpoint} = useFetchAndLoad();
    const dispatch = useAppDispatch();

    const {register, control, handleSubmit, setValue, formState: { errors }} = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: defaultLoginValues,
        resetOptions: {
            keepErrors: false, // input errors will be retained with value update
        }
    });

    const onSubmit = async(data: LoginModel) => {
        const {data: rawData} = await callEndpoint(getUser(1002963532));
        const user = UserAdapter(rawData);
        dispatch(loggInUser(user));
    }

    return {
        theme,
        onSubmit: handleSubmit(onSubmit),
        control,
        register,
        errors,
    }
}  