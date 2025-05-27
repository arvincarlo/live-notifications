import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { createNotification, createRequest } from "@/lib/actions"

import { io, Socket } from "socket.io-client"
import { Badge } from "../ui/badge"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Bell, CalendarCheck } from 'lucide-react';

const API_NOTIFICATIONS = process.env.NEXT_PUBLIC_API_NOTIFICATIONS || "http://localhost:8082";

type Request = {
    id: number;
    requestType: string;
    description: string;
    status: string;
    approver: string;
    requestedBy: string;
    dateCreated?: string;
};

export default function Dashboard({ user }: { user: string }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [requests, setRequests] = useState<Request[]>([])
    const [notifications, setNotifications] = useState<Request[]>([])
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({ requestType: "", description: "", approver: "Ian Mabalot" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRequestTypeChange = (value: string) => {
        setForm({ ...form, requestType: value })
    }

    const handleApproverChange = (value: string) => {
        setForm({ ...form, approver: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setForm({ requestType: "", description: "", approver: "Ian Mabalot" })
        setOpen(false);

        const formRequest = {
            ...form,
            requestedBy: user,
            status: "For Approval",
            dateCreated: new Date().toISOString(),

        }

        const response = await createRequest(formRequest);

        // Update the table
        setRequests([...requests, { ...response }]);

        // Create the notification
        const notification = {
            recipient: response.approver,
            sender: response.requestedBy,
            type: response.requestType,
            isRead: false,
            title: "New Request created",
            message: `${response.requestedBy} just sent you a Lead Request.`,
            createdAt: new Date().toISOString()
        }

        const res = await createNotification(notification);
        if (res) handleNotification(res);
    }

    const handleNotification = (res: any) => {
        socket?.emit("sendNotification", {
            senderName: user,
            receiverName: res.recipient,
            message: res.message
        })
    }


    useEffect(() => {
        // Connect to socket server
        setSocket(io(API_NOTIFICATIONS));
        console.log("Socket connected in client");
    }, []);

    useEffect(() => {
        // Get the request by user
        // async function getRequestsByUser(user: string) {
        //     const response = await fetch(`http://localhost:8082/requests/requestedBy/${user}`);
        //     const data = await response.json();

        //     if (response.ok) {
        //         setRequests(data);
        //     }
        // }

        // Getting all the notifications based on recipient
        const getNotifications = async () => {
            const response = await fetch(`http://localhost:8082/notifications/recipient/${user}`);
            let data = await response.json();

            // Sort the request id in descending order
            data = data.sort((a, b) => b.id - a.id);
            setNotifications(data);
        }
        
        if (user) {
            // getRequestsByUser(user);
            getNotifications();
        }

        // Subsribe the user to the socket
        socket?.emit("newUser", user);

        socket?.on("pushNotification", (data) => {
            console.log("Received Push notifications: ", data);

            // Create the notification
            new Notification("New Notification", {
                body: `${data.senderName} approved your request.`,
                icon: `${API_NOTIFICATIONS}/notification.png`
            })
        });

        // Listen for getNotification and refresh requests
        socket?.on("getNotification", () => {
            // getRequestsByUser(user);
            getNotifications();
        });

        // Clean up listeners on unmount
        return () => {
            socket?.off("pushNotification");
            socket?.off("getNotification");
        };
    }, [socket, user]);

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="flex text-xl font-bold justify-end my-4">Welcome, {user}</div>
            <Tabs defaultValue="requests" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger className="cursor-pointer" value="requests">Requests</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="notifications">Notifications <Badge>{notifications?.length}</Badge></TabsTrigger>
                </TabsList>
                <TabsContent value="requests">
                    <div className="">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>List of requests ({user})</CardTitle>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="cursor-pointer"><Plus />Create Request</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create a Request</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="requestType">Request Type</Label>
                                                <Select value={form.requestType} onValueChange={handleRequestTypeChange}>
                                                    <SelectTrigger id="requestType" className="w-full">
                                                        <SelectValue placeholder="Select request type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="New Lead">New Lead</SelectItem>
                                                        <SelectItem value="Update Lead">Update Lead</SelectItem>
                                                        <SelectItem value="Delete Lead">Delete Lead</SelectItem>
                                                        <SelectItem value="Assign Lead">Assign Lead</SelectItem>
                                                        <SelectItem value="Lead Status Change">Lead Status Change</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    id="description"
                                                    name="description"
                                                    value={form.description}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="approver">Approver</Label>
                                                <Select value={form.approver} onValueChange={handleApproverChange}>
                                                    <SelectTrigger id="approver" className="w-full">
                                                        <SelectValue placeholder="Select approver" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Ian Mabalot">Ian Mabalot</SelectItem>
                                                        <SelectItem value="John Doe">John Doe</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <DialogFooter>
                                                <Button className="cursor-pointer" type="submit">Submit</Button>
                                                <DialogClose asChild>
                                                    <Button className="cursor-pointer" type="button" variant="outline">Cancel</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableCaption>A list of your recent requests.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Request Type</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Approver</TableHead>
                                            <TableHead>Requested By</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {requests.map((req) => (
                                            <TableRow key={req.id}>
                                                <TableCell className="font-medium">{req.id}</TableCell>
                                                <TableCell>{req.requestType}</TableCell>
                                                <TableCell>{req.description}</TableCell>
                                                <TableCell><Badge variant={req.status == "Approved" ? "" : "outline"}>{req.status}</Badge></TableCell>
                                                <TableCell>{req.approver}</TableCell>
                                                <TableCell>{req.requestedBy}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-4">
                                {notifications.length === 0 && (
                                    <div className="flex items-start gap-3">
                                        No notifications available.
                                    </div>
                                )}
                                {notifications.length > 0 && (
                                    <>
                                        {notifications.map((notification) => (
                                            <div key={notification.id} className="flex items-start gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                                                    <CalendarCheck className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm font-medium">{notification.message}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">1 minute ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}