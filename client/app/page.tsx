"use client"

import {useState} from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Dashboard from "@/components/shared/dashboard"

export default function Home() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      { !user ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Leads Maker</CardTitle>
            <CardDescription>Create your request in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input onChange={(e) => setUsername(e.target.value)} id="name" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="cursor-pointer" onClick={() => setUser(username)}>Login</Button>
          </CardFooter>
        </Card>
      ) : (
        <Dashboard user={user}/>
      )}
    </div>
  )
}