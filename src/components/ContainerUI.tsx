import React, { forwardRef } from "react";
import Card from "./Card";

type ChildrenProps = {
  children: React.ReactNode;
  className?: string;
};

function PageContentContainer({ children, className }: ChildrenProps) {
  return (
    <div className={`mt-5 h-full w-full pb-10 ${className}`}>
      <Card className="w-full h-full p-5 overflow-hidden flex flex-col items-center gap-4">
        {children}
      </Card>
    </div>
  );
}

function PageContentCotainer2({ children, className }: ChildrenProps) {
  return (
    <div className={`mt-5 flex flex-col gap-3 h-full ${className}`}>
      {children}
    </div>
  );
}

function PageContentCotainer3({ children, className }: ChildrenProps) {
  return (
    <div className={`mt-5 h-full w-full pb-10 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/*==============================================================*/

function TableRowBodyContainer({ children }: ChildrenProps) {
  return (
    <tr tabIndex={-1} className="h-[50px] border-b border-neutral-500">
      {children}
    </tr>
  );
}

function TableRowHeadContainer({ children }: ChildrenProps) {
  return <tr className="bg-slate-200">{children}</tr>;
}

function TableBodyContainer({ children }: ChildrenProps) {
  return <tbody>{children}</tbody>;
}

function TableHeadContainer({ children }: ChildrenProps) {
  return (
    <thead className="sticky top-0 bg-white font-bold h-10 shadow-sm">
      {children}
    </thead>
  );
}

function TableContainer({ children }: ChildrenProps) {
  return (
    <table aria-label="sticky table" className="w-full h-full overflow-auto">
      {children}
    </table>
  );
}

function DataBottomContainer({ children, className }: ChildrenProps) {
  return (
    <div
      className={`w-full h-fit text-neutral-900 text-sm leading-tight ${className}`}
    >
      {children}
    </div>
  );
}

function ActionTopContainer({ children }: ChildrenProps) {
  return (
    <div className="w-full justify-between items-center flex gap-10">
      {children}
    </div>
  );
}

/*==============================================================*/

const DialogContainer = forwardRef<HTMLDialogElement, ChildrenProps>(
  ({ children }, ref) => {
    return (
      <dialog
        ref={ref}
        className="bg-white rounded-[10px] border border-gray-200 w-3/4 h-fit p-6 py-5 sm:w-1/2"
      >
        {children}
      </dialog>
    );
  }
);

/*==============================================================*/

export {
  TableRowBodyContainer,
  TableRowHeadContainer,
  TableBodyContainer,
  TableHeadContainer,
  TableContainer,
  ActionTopContainer,
  DataBottomContainer,
  PageContentContainer,
  PageContentCotainer2,
  PageContentCotainer3,
  DialogContainer,
};
