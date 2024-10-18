'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import { login } from '@/utils/actions';
import { userInterface } from '@/utils/interface';

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const result: {
      success: boolean;
      token: string;
      user: userInterface;
    } = await login({ email, password });

    if (result.success) {
      router.push('/home');
    } else {
      setInvalidLogin(true);
    }
    setLoading(false);
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Login</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>Please enter your email address and password</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {invalidLogin && <Typography className="error_text">The email or password entered is invalid</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit">{loading ? <CircularProgress /> : 'Login'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginForm;
