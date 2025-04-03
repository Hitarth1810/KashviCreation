"use client";

import { UserList } from "@/app/components/user-list";
import { UserDetails } from "@/app/components/user-details";
import { useState } from "react";

export default function UsersPage() {
  const [updateDetails, setUpdateDetails] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Track selected user

  const handleSetSelectedUser = (userId: number) => {
    setSelectedUser(userId.toString()); // Convert number to string
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto border-r">
        <div className="border-b bg-muted/40 p-4">
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>
        <UserList 
          setUpdate={setUpdateDetails} 
          updateDetails={updateDetails} 
          setSelectedUser={handleSetSelectedUser} // Ensure this matches the expected prop in UserList
        />
      </div>
      <div className="w-[400px]">
        {selectedUser ? (
          <UserDetails selectedUser={selectedUser} setUpdate={setUpdateDetails} /> 
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
            Select a user to view their details
          </div>
        )}
      </div>
    </div>
  );
}
