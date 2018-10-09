const LOG_IN = {
  type: 'POST',
  url: '/login',
  req: {
    username,
    password,
  },
  res: {
    type: 'provider', // Indicates what type of user it is
    username,
    email,
    phone,
    name,
    photo,
  },
};

const LOG_OUT = {
  type: 'DELETE',
  url: '/logout',
  res: STATUS_CODE,
};


const GET_PROFILE = {
  type: 'GET',
  url: '/provider/:username',
  res: {
    username,
    email,
    phone,
    name,
    photo,
  },
};

const UPDATE_INFO = {
  type: 'POST',
  url: '/provider/:username/update',
  req: {
    username,
    email,
    phone,
    name,
  },
  res: {
    username,
    email,
    phone,
    name,
  },
};

const UPDATE_PHOTO = {
  type: 'POST:multipart/form-data',
  url: '/provider/:username/photo/update',
  req: {
    photo,
  },
  res: {
    photo,
  },
};

const UPDATE_PASSWORD = {
  type: 'POST',
  url: '/provider/:username/password/update',
  req: {
    oldPassword,
    newPassword,
  },
  res: STATUS_CODE,
};

const DELETE = {
  type: 'DELETE',
  url: '/provider/:username/delete',
  res: STATUS_CODE,
};
