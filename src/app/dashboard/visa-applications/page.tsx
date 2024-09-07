"use client"

import { useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      visaStatus: "Approved",
      address: "123 Main St, Anytown USA",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      visaStatus: "Pending",
      address: "456 Oak Rd, Somewhere City",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      visaStatus: "Denied",
      address: "789 Elm St, Elsewhere Town",
    },
    {
      name: "Samantha Lee",
      email: "samantha@example.com",
      phone: "555-3456",
      visaStatus: "Approved",
      address: "321 Pine Ave, Anyplace",
    },
    {
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "555-7890",
      visaStatus: "Pending",
      address: "654 Maple Blvd, Somewhere Else",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "555-2109",
      visaStatus: "Approved",
      address: "987 Oak St, Elsewhere City",
    },
    {
      name: "David Nguyen",
      email: "david@example.com",
      phone: "555-6543",
      visaStatus: "Denied",
      address: "159 Elm Rd, Anyplace Town",
    },
    {
      name: "Sarah Kim",
      email: "sarah@example.com",
      phone: "555-2468",
      visaStatus: "Pending",
      address: "753 Pine Ln, Somewhere Place",
    },
    {
      name: "Tom Wilson",
      email: "tom@example.com",
      phone: "555-7890",
      visaStatus: "Approved",
      address: "951 Maple Dr, Elsewhere Area",
    },
    {
      name: "Olivia Garcia",
      email: "olivia@example.com",
      phone: "555-2109",
      visaStatus: "Denied",
      address: "357 Oak Ave, Anyplace City",
    },
    {
      name: "Olivia Garcia",
      email: "olivia@example.com",
      phone: "555-2109",
      visaStatus: "Denied",
      address: "357 Oak Ave, Anyplace City",
    },
    {
      name: "Olivia Garcia",
      email: "olivia@example.com",
      phone: "555-2109",
      visaStatus: "Denied",
      address: "357 Oak Ave, Anyplace City",
    },
  ]
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Visa Status</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.visaStatus === "Approved"
                      ? "secondary"
                      : user.visaStatus === "Pending"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {user.visaStatus}
                </Badge>
              </TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <div className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}