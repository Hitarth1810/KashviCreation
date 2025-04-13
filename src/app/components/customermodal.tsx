"use client";

import { X } from "lucide-react";
import { UserDetails } from "@/app/components/user-details";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";

interface CustomerModalProps {
  selectedUser: string;
  open: boolean;
  onClose: () => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomerModal({
  selectedUser,
  open,
  onClose,
  setUpdate,
}: CustomerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-sm w-full mx-auto overflow-hidden rounded-xl border shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted">
          <h2 className="text-lg font-semibold">User Details</h2>
          <button onClick={onClose} className="hover:text-red-600 transition">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-3">
          <UserDetails selectedUser={selectedUser} setUpdate={setUpdate} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
