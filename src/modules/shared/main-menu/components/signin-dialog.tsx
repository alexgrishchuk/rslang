import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { signIn } from '../../../../backend-requests/user-requests';

interface SignInProps {
  onCloseCallback: () => void;
  onLoginCallback: () => void;
}

export default function SignInDialog({ onCloseCallback, onLoginCallback }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signInUser = async () => {
    const isSignIn = await signIn(email, password);

    if (isSignIn) {
      onCloseCallback();
      onLoginCallback();
    }
  };

  return (
    <Box component="form">
      <TextField
        autoFocus
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
        <Button onClick={signInUser}>Войти</Button>
      </DialogActions>
    </Box>
  );
}
