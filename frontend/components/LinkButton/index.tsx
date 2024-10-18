import { Button } from '@mui/material';
import { ReactNode } from 'react';

import { VARIANT } from '@/utils/constants';

interface ButtonProp {
  children: ReactNode;
  className: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: VARIANT;
  onClick?: () => void;
}

const LinkButton = ({ children, className, startIcon, endIcon, variant, onClick }: ButtonProp) => {
  return (
    <Button className={className} startIcon={startIcon} endIcon={endIcon} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default LinkButton;
