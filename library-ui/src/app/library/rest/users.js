import axios from "axios";

const USER_API_PATH = './api/users';

export const fetchCurrentUser = () => axios.get(USER_API_PATH + '/search/current');