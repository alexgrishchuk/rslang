import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createUser, signIn } from '../../../backend-requests/user-requests';

const validationSchema = yup.object({
  name: yup.string().trim().required('Имя обязательно'),
  email: yup.string().email('Введите правильный email').required('Email обязателен'),
  password: yup
    .string()
    .strict()
    .trim('Пробельные символы в начале и конце пароля не допускаются')
    .min(8, 'Пароль должен состоять минимум из 8 символов')
    .required('Пароль обязателен'),
});

interface RegisterProps {
  onCloseCallback: () => void;
  onLoginCallback: () => void;
}

export default function RegisterDialog({ onCloseCallback, onLoginCallback }: RegisterProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const submitButton = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await createUser(values.name.trim(), values.email, values.password);

      if (response.ok) {
        const isSignIn = await signIn(values.email, values.password);
        onCloseCallback();
        if (isSignIn) {
          onLoginCallback();
        }
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
        id="name"
        label="Имя"
        type="text"
        fullWidth
        variant="standard"
        required
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
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
      <DialogActions>
        <Button onClick={onCloseCallback}>Отмена</Button>
        <Button type="submit" ref={submitButton}>
          Зарегистрироваться
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
            Невозможно создать пользователя с таким email и паролем!
          </Typography>
        </Popover>
      </DialogActions>
    </form>
  );
}
