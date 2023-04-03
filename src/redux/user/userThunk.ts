import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Iresponse {
  data: {
    results: {
      login: {
        uuid: string;
      };
      name: {
        title: string;
        first: string;
        last: string;
      };
      email: string;
      picture: {
        medium: string;
      };
      location: {
        street: { name: string };
        city: string;
        country: string;
      };
    }[];
  };
}

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response: Iresponse = await axios.get(
      "https://randomuser.me/api/?results=10"
    );
    return response.data.results.map((el) => ({
      id: el.login.uuid,
      name: el.name,
      email: el.email,
      picture: el.picture.medium,
      location: {
        country: el.location.country,
        city: el.location.city,
        street: el.location.street.name,
      },
    }));
  } catch (err) {
    console.log(err);
    
  }
});
