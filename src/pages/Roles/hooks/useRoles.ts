import React, { useEffect } from 'react'
import { useFetchAndLoad } from '../../../hooks'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { RoleModel } from '../../../models';
import { getRoles } from '../../../services';
import { RoleAdapter } from '../../../adapters';

export const useRoles = () => {
    
    const { callEndpoint, loading } = useFetchAndLoad();
    const dispatch = useDispatch();
    const [roles, setRoles] = useState<RoleModel[]>([]);
    
    const loadAllRoles = async() => {
        try{
            const {data} = await callEndpoint(getRoles());
            const adaptedRoles = data.map((role: RoleModel) => RoleAdapter(role));
            setRoles(adaptedRoles);
        }catch(err){
            throw new Error(err.message);
        }
    }

    useEffect(() => {
        loadAllRoles();
    }, [])

    return {
        loadAllRoles,
        roles
    }
}
