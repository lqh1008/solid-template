import { Component, JSX } from 'solid-js';
import { useParams } from '@solidjs/router';

interface IProps {
    children?: JSX.Element | JSX.Element[];
}
const UserDetail: Component<IProps> = ({ children }) => {
    const params = useParams<{ id: string }>();

    return (
        <div>
            <h1>User Detail for ID: {params.id}</h1>
            <p>Here you can see details for user with ID {params.id}.</p>
            {children}
        </div>
    );
};

export default UserDetail;
