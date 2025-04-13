"use client";

import { useState, useEffect } from "react";
import { UserList } from "@/app/components/user-list";
import { UserDetails } from "@/app/components/user-details";
import CustomerModal from "@/app/components/customermodal";

export default function UsersPage() {
  const [updateDetails, setUpdateDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleSetSelectedUser = (userId: number) => {
    setSelectedUser(userId.toString());
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  // Detect screen size on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="flex h-screen">
        {/* User List */}
        <div className="flex-1 overflow-auto border-r">
          <div className="border-b bg-muted/40 p-4">
            <h1 className="text-2xl font-semibold">Users</h1>
          </div>
          <UserList
            setUpdate={setUpdateDetails}
            updateDetails={updateDetails}
            setSelectedUser={handleSetSelectedUser}
          />
        </div>

        {/* User Details (Sidebar for md and up) */}
        <div className="hidden md:block w-[400px]">
          {selectedUser ? (
            <UserDetails
              selectedUser={selectedUser}
              setUpdate={setUpdateDetails}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
              Select a user to view their details
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal for mobile screens only */}
      {isMobile && selectedUser && (
        <CustomerModal
          selectedUser={selectedUser}
          open={!!selectedUser}
          onClose={closeModal}
          setUpdate={setUpdateDetails}
        />
      )}
    </>
  );
}
