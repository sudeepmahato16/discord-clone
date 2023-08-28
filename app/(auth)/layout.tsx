import { ReactNode, FC } from "react";

interface AuthLayoutProp {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProp> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
