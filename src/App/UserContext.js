import React from 'react';

const UserContext = React.createContext({
  currentUser: null,
  set: () => { },
  unset: () => { },
});

export default UserContext;
