const store = {
  entities: {
    users: {
      userId: {
        queues: [],
        appointments: [],
      },
    },
    queues: {
      queueId: {
        appointments: [],
      },
    },
    appointments: { },
  },
  currentUser: userId,
};