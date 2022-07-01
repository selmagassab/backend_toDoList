const roles = ['patient', 'secretary', 'doctor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['patient']);
roleRights.set(roles[1], ['secretary']);
roleRights.set(roles[2], ['secretary', 'doctor']);
roleRights.set(roles[3], ['patient', 'secretary', 'doctor', 'admin']);

module.exports = {
  roles,
  roleRights,
};
