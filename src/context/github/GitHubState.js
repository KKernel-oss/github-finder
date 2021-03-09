import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
} from '../types';

let githubClientToken;

if (process.env.NODE_ENV !== 'production') {
  githubClientToken = process.env.REACT_APP_CLIENT_TOKEN;
} else {
  githubClientToken = process.env.REACT_APP_CLIENT_TOKEN;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    loading: false,
    repos: [],
    user: {},
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //set loading
  const setLoadingFunc = () => dispatch({ type: SET_LOADING });

  //Search users
  const findUsers = async (text) => {
    setLoadingFunc();
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${githubClientToken}`,
        },
      }
    );
    dispatch({ type: SEARCH_USERS, payload: response.data.items });
  };

  //Clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //Get single user details
  const getSingleUser = async (username) => {
    setLoadingFunc();
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${githubClientToken}`,
        },
      }
    );
    dispatch({ type: GET_USER, payload: response.data });
  };

  //Get repos for a user
  const getUserRepos = async (username) => {
    setLoadingFunc();

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Authorization: `token ${githubClientToken}`,
        },
      }
    );
    dispatch({ type: GET_REPOS, payload: response.data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        repos: state.repos,
        user: state.user,
        findUsers,
        clearUsers,
        getSingleUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
