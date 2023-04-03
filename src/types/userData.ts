export interface IUserData {
  id: string;
  name: {
    title?: string;
    first: string;
    last: string;
  };
  email: string;
  picture?: string;
  location: {
    country: string;
    city: string;
    street: string;
  };
}

export interface IFilterData {
  id: string;
  name: string;
  email: string;
  location: string;
}
