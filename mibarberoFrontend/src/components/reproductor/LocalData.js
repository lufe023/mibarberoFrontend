const saveLocalData = (current) => {
  localStorage.setItem("reproductor", JSON.stringify({ current }));
};

const readLocalData = (reproductor) => {
  return localStorage.getItem(reproductor);
};
module.exports = {
  saveLocalData,
  readLocalData,
};
