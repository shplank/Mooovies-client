import React, { useState } from 'react';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthdate);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={Username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={Password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={Email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthdate:
        <input type="date" value={Birthdate} onChange={e => setBirthdate(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
