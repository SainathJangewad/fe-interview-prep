import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';
import { fetchUser } from '../actions/userActions';

const User: React.FC = () => {
    const { data, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser() as any);
    }, []);

    return (
        <div>
            <h2>User Data:</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && <p>Name: {data.name}</p>}
        </div>
    );
};

export default User;
