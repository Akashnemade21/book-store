import { Button } from '@mui/material';
import { ReactNode } from 'react';

import { VARIANT } from '@/utils/constants';

interface ButtonProp {
  children: ReactNode;
  className: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: VARIANT;
}

export default function LinkButton({ children, className, startIcon, endIcon, variant }: ButtonProp) {
  return (
    <Button className={className} startIcon={startIcon} endIcon={endIcon} variant={variant}>
      {children}
    </Button>
  );
}
