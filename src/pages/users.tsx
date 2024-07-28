import { Component, JSX } from "solid-js";

interface IProps {
    children?: JSX.Element | JSX.Element[];
}

const Users: Component<IProps> = ({ children }) => {
    return (
        <div>
            <h1>Users Page</h1>
            <p>Welcome to the users page.</p>
            {children}
        </div>
    );
};

export default Users;