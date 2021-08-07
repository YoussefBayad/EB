const token = JSON.parse(localStorage.getItem('user'))?.token;
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default header;
