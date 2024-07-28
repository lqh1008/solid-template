import { Component } from 'solid-js';
import { useParams } from '@solidjs/router';

const UserSettings: Component = () => {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <h1>Settings for User ID: {params.id}</h1>
      <p>Adjust settings for user with ID {params.id} here.</p>
    </div>
  );
};

export default UserSettings;
