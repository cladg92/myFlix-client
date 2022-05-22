import React, { useState } from 'react';

export function RegisterView(props) {
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ birthDate, setBirthDate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email,username, password, birthDate);
  };

  return (
    <form>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={email} onChange={e => setBirthDate(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}