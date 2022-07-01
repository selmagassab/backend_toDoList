const messageSeenByUser = async (userid, array) => {
  const ok = array
    .map((read) => {
      return read.user;
    })
    .includes(userid);
  return ok;
};

const messageSeenByUserPopulated = async (userid, array) => {
  const ok = array
    .map((read) => {
      return read.user.id;
    })
    .includes(userid);

  return ok;
};

module.exports = {
  messageSeenByUser,
  messageSeenByUserPopulated,
};
