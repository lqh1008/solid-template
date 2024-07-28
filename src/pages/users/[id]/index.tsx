import { Component } from 'solid-js';
import { useParams } from '@solidjs/router';

const UserIndex: Component = () => {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <h1>User Index for ID: {params.id}</h1>
      <p>This is the main page for user with ID {params.id}.</p>
    </div>
  );
};

export default UserIndex;
