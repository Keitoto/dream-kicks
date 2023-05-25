import { Link } from 'react-router-dom';

import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  to: string;
};
export const StyledLink: FC<Props> = ({ children, to }) => (
  <Link to={to} className="no-underline text-default hover:text-hover">
    {children}
  </Link>
);
