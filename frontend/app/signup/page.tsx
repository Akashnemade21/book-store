'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signup } from '@/utils/actions';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function SignUpModal() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvaliPassword] = useState(false);

  const handleCancel = () => {
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: {
      success: boolean;
    } = await signup({ name, email, password });
    if (result.success) {
      router.push('/login');
    } else {
      setInvaliPassword(true);
    }
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the follwing details</DialogContentText>
        <form onSubmit={handleSubmit}></form>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="name"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        {invalidPassword && <Typography className="error_text">Enter password as per the condition</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="submit">Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
}
