import Axios from "axios";

/* eslint-disable import/no-anonymous-default-export */
export default {
  getProductDetails: (region) => {
    return Axios.get(`https://restcountries.com/v3.1/region/${region}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
