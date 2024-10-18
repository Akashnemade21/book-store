'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { logout } from '@/utils/actions';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    logout().then(() => {
      localStorage.removeItem('user');
      router.push('/');
    });
  });

  return <></>;
};

export default Logout;
