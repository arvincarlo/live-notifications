import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const requestsInitial = [
    {
        id: "REQ001",
        requestType: "Leave",
        description: "Annual Leave for June",
        status: "Pending",
        approver: "Jane Smith",
        requestedBy: "John Doe",
    },
    {
        id: "REQ002",
        requestType: "Overtime",
        description: "Overtime for Project X",
        status: "Approved",
        approver: "Michael Lee",
        requestedBy: "Alice Brown",
    },
    {
        id: "REQ003",
        requestType: "Travel",
        description: "Business Trip to NY",
        status: "Rejected",
        approver: "Sarah Kim",
        requestedBy: "David Clark",
    },
    {
        id: "REQ004",
        requestType: "Leave",
        description: "Sick Leave",
        status: "Approved",
        approver: "Jane Smith",
        requestedBy: "Emily White",
    },
    {
        id: "REQ005",
        requestType: "Equipment",
        description: "Laptop Replacement",
        status: "Pending",
        approver: "Michael Lee",
        requestedBy: "Chris Evans",
    },
]

export default function Dashboard() {
    const [requests, setRequests] = useState(requestsInitial)
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({ requestType: "", description: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setRequests([
            ...requests,
            {
                id: `REQ${(requests.length + 1).toString().padStart(3, "0")}`,
                requestType: form.requestType,
                description: form.description,
                status: "Pending",
                approver: "N/A",
                requestedBy: "You",
            },
        ])
        setForm({ requestType: "", description: "" })
        setOpen(false)
    }

    return (
        <div className="">
            <Card className="w-full max-w-3xl mx-auto p-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>List of requests</CardTitle>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Create Request</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Request</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="requestType">Request Type</Label>
                                    <Input
                                        id="requestType"
                                        name="requestType"
                                        value={form.requestType}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">Cancel</Button>
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
                                    <TableCell>{req.status}</TableCell>
                                    <TableCell>{req.approver}</TableCell>
                                    <TableCell>{req.requestedBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}