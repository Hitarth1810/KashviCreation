"use client";

import Image from "next/image";
import { Phone, Mail, CircleUserRound, MapPin, ChevronDown, ChevronUp } from "lucide-react";
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

export function UserDetails({ selectedUser, setUpdate }: { selectedUser: string | null; setUpdate: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [details, setDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔄 useEffect triggered. selectedUser:", selectedUser);
  
    if (!selectedUser) {
      console.warn("🚨 No selectedUser, skipping API call.");
      return;
    }
  
    const fetchData = async () => {
      setLoading(true);
      console.log(`📡 Fetching user details for userId: ${selectedUser}`);
  
      try {
        const response = await axios.get(`/api/protected/admin/customer?userId=${selectedUser}`);
        console.log("✅ API Response:", response.data);
        setDetails(response.data);
        setUpdate(false);
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedUser, setUpdate]); // 👈 Ensure dependencies are correct
  
  
  


  useEffect(() => {
    console.log("🛠 Re-rendering component. Current details state:", details);
  }, [details]);

  console.log("ℹ️ Current selectedUser:", selectedUser);
  console.log("📊 Current user details state:", details);

  if (!selectedUser)
    return (
      <div className='flex h-full items-center justify-center p-8 text-center text-muted-foreground'>
        Select a user to view their details
      </div>
    );

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center p-8 text-center'>
        Loading user details...
      </div>
    );
  }

  if (!details) {
    return (
      <div className='flex h-full items-center justify-center p-8 text-center text-muted-foreground'>
        ⚠️ No user data available.
        <pre>{JSON.stringify(details, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className='h-full border-l p-4'>
      <div className='border-b bg-muted/40 p-4'>
        <h2 className='text-lg font-semibold'>User Details</h2>
        <p className='text-sm text-muted-foreground'>User #{details?.id}</p>
      </div>
      <div className='p-4'>
        <div className='flex items-center gap-4'>
          {details?.image ? (
            <Image src={details.image} alt={details.name} width={64} height={64} className='rounded-full' />
          ) : (
            <CircleUserRound height={64} width={64} strokeWidth={'1px'} color='black' />
          )}
          <div>
            <h3 className='font-semibold'>{details?.name || "Unknown"}</h3>
            <div className='mt-1 space-y-1 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'><Mail className='h-4 w-4' /> {details?.email}</div>
              <div className='flex items-center gap-2'><Phone className='h-4 w-4' /> {details?.phone}</div>
            </div>
          </div>
        </div>
        <Separator className='my-4' />
        <h4 className='font-semibold'>Addresses</h4>
        <div className='mt-2 space-y-2'>
          {(details?.addresses ?? []).length > 0 ? (
            details?.addresses.map((address, index) => (
              <Card key={index}>
                <CardContent className='p-4 flex items-center gap-2'>
                  <MapPin className='h-5 w-5' /> {address}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className='text-sm text-muted-foreground'>No addresses available</p>
          )}
        </div>
        <Separator className='my-4' />
        <h4 className='font-semibold'>Orders</h4>
        <div className='mt-2 space-y-2'>
          {details.orders?.length > 0 ? (
            details.orders.map((order) => (
              <Card key={order.id}>
                <CardContent className='p-4'>
                  <div className='flex justify-between items-center cursor-pointer' onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                    <div>Order ID: {order.id}</div>
                    <Badge variant={order.status === "confirmed" ? "default" : order.status === "cancelled" ? "destructive" : "outline"}>
                      {order.status}
                    </Badge>
                    {expandedOrder === order.id ? <ChevronUp className='h-5 w-5' /> : <ChevronDown className='h-5 w-5' />}
                  </div>
                  {expandedOrder === order.id && (
                    <div className='mt-2 space-y-2'>
                      {order.products.map((product) => (
                        <div key={product.id} className='p-2 border rounded-lg'>
                          <p className='text-sm text-muted-foreground'>Product ID: {product.id}</p>
                          <p className='font-medium'>{product.name}</p>
                          <Badge variant='secondary'>{product.quantity}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className='text-sm text-muted-foreground'>No orders made</p>
          )}
        </div>
      </div>
    </div>
  );
}
