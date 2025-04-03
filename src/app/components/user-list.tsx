"use client";

import axios from "axios";
import { useEffect, useState } from "react";


interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserListProps {
  updateDetails: boolean;
  setUpdate: (value: boolean) => void;
  setSelectedUser: (userId: number) => void;
}

export function UserList({ setUpdate, updateDetails, setSelectedUser }: UserListProps) {
  
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/protected/admin/customer");
        setUsers(response.data);
        setUpdate(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [updateDetails, setUpdate]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground">
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
      </div>
      <div className="mt-2 space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50"
            onClick={() => {
              setSelectedUser(user.id);
              
            }}
          >
            <div className="grid grid-cols-3 items-center gap-4">
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}