import { useState, useEffect } from "react";
import { PortalTopbar } from "../../comoponents/PortalTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "../../comoponents/ui/card";
import { Button } from "../../comoponents/ui/button";
import { Badge } from "../../comoponents/ui/badge";
import { Input } from "../../comoponents/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../comoponents/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../comoponents/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../comoponents/ui/dropdown-menu";
import { Search, MoreHorizontal } from "lucide-react";
import api from "../../api/axios";

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  active?: boolean;
  isActive?: boolean;
}

export function UserManagement() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get<UserRow[] | { content: UserRow[] }>("/users")
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : (data as any).content ?? [];
        if (!cancelled) setUsers(list);
      })
      .catch(() => {
        if (!cancelled) setUsers([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      search === "" ||
      [u.name, u.email].some(
        (s) => s && String(s).toLowerCase().includes(search.toLowerCase())
      );
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleLabel = (r: string) => {
    if (r === "CANDIDATE") return "Job Seeker";
    if (r === "RECRUITER") return "Employer";
    return r;
  };

  return (
    <>
      <PortalTopbar title="User Management" subtitle="Manage platform users and permissions" />
      <main className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="CANDIDATE">Job Seekers</SelectItem>
                  <SelectItem value="RECRUITER">Employers</SelectItem>
                  <SelectItem value="ADMIN">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <p className="text-gray-500 py-8">Loading…</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name ?? "—"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{roleLabel(user.role)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            (user.active ?? user.isActive ?? true)
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {(user.active ?? user.isActive ?? true) ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
