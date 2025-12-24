import { ReactNode } from "react";

interface AboutLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function AboutLayout({ children, modal }: AboutLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
