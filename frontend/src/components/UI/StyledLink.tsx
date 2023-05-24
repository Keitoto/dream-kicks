import { Link } from 'react-router-dom';

import { FC, ReactNode } from 'react';

type Props = {
  to: string;
  children: ReactNode;
};
export const StyledLink: FC<Props> = ({ to, children }) => (
  <Link to={to} className="no-underline text-default hover:text-hover">
    {children}
  </Link>
);
