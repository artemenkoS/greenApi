import clsx from 'clsx';

import styles from './Button.module.css';
import React from 'react';

interface Props {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  text: string;
  type?: 'submit'|"button"| "reset"
  onClick: (e: any) => void;
}

export const Button: React.FC<Props> = ({ className, disabled = false, fullWidth = false, type= "button", text, onClick,} ) => {
  return (
    <button
      className={clsx(styles.root, fullWidth && styles.fullWidth, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
