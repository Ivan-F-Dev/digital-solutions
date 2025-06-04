import type { ButtonHTMLAttributes, FC } from 'react';
import './Button.scss';

type ButtonProps = {
  children: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, onClick, ...rest }) => {
  return (
    <button
      className='button'
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button;