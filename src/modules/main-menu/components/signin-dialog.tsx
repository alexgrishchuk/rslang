import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { signIn } from '../../../backend-requests/user-requests';

const validationSchema = yup.object({
  email: yup.string().email('Введите правильный email').required('Email обязателен'),
  password: yup
    .string()
    .strict()
    .trim('Пробельные символы в начале и конце пароля не допускаются')
    .min(8, 'Пароль должен состоять минимум из 8 символов')
    .required('Пароль обязателен'),
});

interface SignInProps {
  onCloseCallback: () => void;
  onLoginCallback: () => void;
}

export default function SignInDialog({ onCloseCallback, onLoginCallback }: SignInProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const submitButton = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const isSignIn = await signIn(values.email, values.password);

      if (isSignIn) {
        onCloseCallback();
        onLoginCallback();
      } else {
        setAnchorEl(submitButton.current);
      }
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
        required
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
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
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <DialogActions sx={{ display: 'flex', flexWrap: 'wrap-reverse' }}>
        <Button onClick={onCloseCallback}>Отмена</Button>
        <Button type="submit" ref={submitButton}>
          Войти
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }} color="red">
            Пользователь с таким email и паролем не найден!
          </Typography>
        </Popover>
      </DialogActions>
    </form>
  );
}
