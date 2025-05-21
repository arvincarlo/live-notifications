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
import { useState } from "react"
import { createRequest } from "@/lib/actions"
import { create } from "domain"

const requestsInitial = [
    {
        id: "REQ001",
        requestType: "New Lead",
        description: "Request to add a new sales lead for Acme Corp.",
        status: "Pending",
        approver: "Ian Mabalot",
        requestedBy: "John Doe",
    },
    {
        id: "REQ002",
        requestType: "Update Lead",
        description: "Update contact info for lead: Beta Inc.",
        status: "Approved",
        approver: "Ian Mabalot",
        requestedBy: "Alice Brown",
    },
    {
        id: "REQ003",
        requestType: "Delete Lead",
        description: "Remove duplicate lead: Gamma LLC.",
        status: "Rejected",
        approver: "Ian Mabalot",
        requestedBy: "David Clark",
    },
    {
        id: "REQ004",
        requestType: "Assign Lead",
        description: "Assign lead Delta Ltd. to sales rep Mike.",
        status: "Approved",
        approver: "Ian Mabalot",
        requestedBy: "Emily White",
    },
    {
        id: "REQ005",
        requestType: "Lead Status Change",
        description: "Change status of lead Omega to 'Contacted'.",
        status: "Pending",
        approver: "Ian Mabalot",
        requestedBy: "Chris Evans",
    },
]

export default function Dashboard() {
    const [requests, setRequests] = useState(requestsInitial)
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
        setRequests([
            ...requests,
            {
                id: `REQ${(requests.length + 1).toString().padStart(3, "0")}`,
                requestType: form.requestType,
                description: form.description,
                status: "Pending",
                approver: form.approver,
                requestedBy: "You",
            },
        ])
        setForm({ requestType: "", description: "", approver: "Ian Mabalot" })
        setOpen(false);

        const response = await createRequest(form);
        console.log(response);

        console.log("New Request Created:", form)
    }

    return (
        <div className="">
            <Card className="w-full max-w-5xl mx-auto p-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>List of requests</CardTitle>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="cursor-pointer"><Plus/>Create Request</Button>
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