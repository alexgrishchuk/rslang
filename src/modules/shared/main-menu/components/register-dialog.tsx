import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { createUser, signIn } from '../../../../backend-requests/user-requests';

interface RegisterProps {
  onCloseCallback: () => void;
  onLoginCallback: () => void;
}

export default function RegisterDialog({ onCloseCallback, onLoginCallback }: RegisterProps) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerUser = async () => {
    const response = await createUser(userName, email, password);
    if (response.ok) {
      const isSignIn = await signIn(email, password);
      if (isSignIn) {
        onCloseCallback();
        onLoginCallback();
      }
    }
  };

  return (
    <Box component="form">
      <TextField
        autoFocus
        margin="dense"
        id="user-name"
        label="Имя"
        type="text"
        fullWidth
        variant="standard"
        required
        value={userName}
        onChange={handleNameChange}
      />
      <TextField
        margin="dense"
        id="email"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
        required
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        name="password"
        label="Пароль"
        type="password"
        variant="standard"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <DialogActions>
        <Button onClick={onCloseCallback}>Отмена</Button>
        <Button onClick={registerUser}>Зарегистрироваться</Button>
      </DialogActions>
    </Box>
  );
}
