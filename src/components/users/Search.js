import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

function Search() {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { setAlertFunc } = alertContext;
  const { clearUsers, findUsers, users } = githubContext;

  //use useState to create state for functional components
  const [text, setText] = useState('');

  const captureText = (e) => {
    setText(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlertFunc('Please enter a search text', 'light');
    } else {
      findUsers(text);
    }
  };

  return (
    <div>
      <form onSubmit={submitForm} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users..'
          value={text}
          onChange={captureText}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
}

export default Search;
