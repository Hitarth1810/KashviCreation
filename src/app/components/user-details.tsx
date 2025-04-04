"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  CircleUserRound,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  image?: string;
  addresses: string[];
  role: "user" | "admin";
  orders: {
    id: string;
    status: string;
    products: {
      id: string;
      name: string;
      quantity: number;
    }[];
  }[];
}

interface Address {
  address: string;
  area: string;
  city: string;
  pincode: string;
  landmark: string;
  state: string;
}

export function UserDetails({
  selectedUser,
  setUpdate,
}: {
  selectedUser: string | null;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [details, setDetails] = useState<User | null>(null);
  const [shippingAddresses, setShippingAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/protected/admin/customer?userId=${selectedUser}`
        );
        console.log(response.data);
        setDetails(response.data);
        setUpdate(false);
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `/api/protected/user/order?userId=${selectedUser}`
        );
        if (Array.isArray(response.data)) {
          setDetails((prev) =>
            prev ? { ...prev, orders: response.data } : null
          );
        } else {
          console.warn("Unexpected orders format:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchUserDetails();
    fetchOrders(); // Fetch orders separately
  }, [selectedUser, setUpdate]);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchShippingAddresses = async () => {
      try {
        const response = await axios.get(
          `/api/protected/user/shipping-address?userId=${selectedUser}`
        );

        if (Array.isArray(response.data)) {
          setShippingAddresses(
            response.data.map(
              (addr: {
                address: string;
                area: string;
                city: string;
                pincode: string;
                landmark?: string;
                state: string;
              }) => ({
                address: addr.address,
                area: addr.area,
                city: addr.city,
                pincode: addr.pincode,
                landmark: addr.landmark || "N/A",
                state: addr.state,
              })
            )
          );
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching shipping addresses:", error);
      }
    };

    fetchShippingAddresses();
  }, [selectedUser]);

  const handleRoleChange = async () => {
    if (!details) return;

    const newRole = details.role.toUpperCase() === "USER" ? "ADMIN" : "USER";

    try {
      await axios.put(
        `/api/protected/admin/update-role`,
        {
          userId: details.id,
          role: newRole,
        },
        {
          withCredentials: true, // ✅ this ensures cookies (like JWT) are sent
        }
      );

      setDetails({
        ...details,
        role: newRole.toLowerCase() as "user" | "admin",
      });
    } catch (error) {
      console.error("❌ Error updating role:", error);
    }
  };

  if (!selectedUser)
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        Select a user to view their details
      </div>
    );

  if (loading)
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        Loading user details...
      </div>
    );

  if (!details)
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        ⚠️ No user data available.
      </div>
    );

  return (
    <div className="h-full border-l p-4">
      <div className="border-b bg-muted/40 p-4">
        <h2 className="text-lg font-semibold">User Details</h2>
        <p className="text-sm text-muted-foreground">User #{details?.id}</p>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4">
          {details?.image ? (
            <Image
              src={details.image}
              alt={details.name}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <CircleUserRound
              height={64}
              width={64}
              strokeWidth={"1px"}
              color="black"
            />
          )}
          <div>
            <h3 className="font-semibold">{details?.name || "Unknown"}</h3>
            <div className="mt-1 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {details?.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {details?.phone}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        {/* Role Change Section */}
        <h4 className="font-semibold">User Role</h4>
        <div className="flex items-center gap-4 mt-2">
          <Badge variant={details.role === "admin" ? "default" : "outline"}>
            {details.role.toUpperCase()}
          </Badge>
          <Button onClick={handleRoleChange} variant="secondary">
            Change to {details.role.toUpperCase() === "USER" ? "ADMIN" : "USER"}
          </Button>
        </div>

        {/* Shipping Addresses Section */}

        <h4 className="font-semibold">Shipping Addresses</h4>
        <div className="mt-2 space-y-2">
          {shippingAddresses.length > 0 ? (
            shippingAddresses.map((addr, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong>Address:</strong> {addr.address}, {addr.area}
                  </p>
                  <p className="text-sm">
                    <strong>City:</strong> {addr.city}, <strong>State:</strong>{" "}
                    {addr.state}
                  </p>
                  <p className="text-sm">
                    <strong>Pincode:</strong> {addr.pincode}
                  </p>
                  <p className="text-sm">
                    <strong>Landmark:</strong> {addr.landmark}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No shipping addresses found
            </p>
          )}
        </div>

        <Separator className="my-4" />
        <h4 className="font-semibold">Orders</h4>
        <div className="mt-2 space-y-2">
          {details.orders?.length > 0 ? (
            details.orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.id ? null : order.id
                      )
                    }
                  >
                    <div>Order ID: {order.id}</div>
                    <Badge
                      variant={
                        order.status === "confirmed"
                          ? "default"
                          : order.status === "cancelled"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                  {expandedOrder === order.id && (
                    <div className="mt-2 space-y-2">
                      {order.products.map((product) => (
                        <div key={product.id} className="p-2 border rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Product ID: {product.id}
                          </p>
                          <p className="font-medium">{product.name}</p>
                          <Badge variant="secondary">{product.quantity}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No orders made</p>
          )}
        </div>
      </div>
    </div>
  );
}
