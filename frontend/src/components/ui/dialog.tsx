import * as React from "react";

export const Dialog = ({ open, onOpenChange, children }: any) => {
  if (!open) return null;
  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full"
      >
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }: any) => <>{children}</>;
export const DialogHeader = ({ children }: any) => (
  <div className="mb-2 font-semibold text-lg">{children}</div>
);
export const DialogTitle = ({ children }: any) => <h2>{children}</h2>;
export const DialogFooter = ({ children }: any) => (
  <div className="mt-4 flex justify-end">{children}</div>
);

