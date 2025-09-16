import React, { useEffect, useMemo, useState } from "react";
import type { HeadCell, Order, Request } from "../types";

const useGetDemandAchatList = () => {
   const [requests, setRequests] = useState<Request[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [order, setOrder] = useState<Order>("asc");
   const [orderBy, setOrderBy] = useState<keyof Request>("id");
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);

   const headCells: HeadCell[] = [
      { id: "id", numeric: false, label: "Request ID" },
      { id: "itemName", numeric: false, label: "Item Name" },
      { id: "department", numeric: false, label: "Department" },
      { id: "date", numeric: false, label: "Date" },
      { id: "amount", numeric: true, label: "Amount" },
      { id: "status", numeric: false, label: "Status" },
   ];

   useEffect(() => {
      const fetchedRequests: Request[] = [
         {
            id: "REQ001",
            itemName: "Laptop",
            department: "IT",
            date: "2023-01-15",
            amount: 1200,
            status: "Approved",
         },
         {
            id: "REQ002",
            itemName: "Office Chairs",
            department: "HR",
            date: "2023-01-20",
            amount: 500,
            status: "Pending",
         },
         {
            id: "REQ003",
            itemName: "Printer Ink",
            department: "Admin",
            date: "2023-01-22",
            amount: 150,
            status: "Draft",
         },
         {
            id: "REQ004",
            itemName: "Server Upgrade",
            department: "IT",
            date: "2023-02-01",
            amount: 3500,
            status: "Rejected",
         },
         {
            id: "REQ005",
            itemName: "New Monitors",
            department: "IT",
            date: "2023-02-05",
            amount: 800,
            status: "Approved",
         },
         {
            id: "REQ006",
            itemName: "Desk Supplies",
            department: "Admin",
            date: "2023-02-10",
            amount: 100,
            status: "Pending",
         },
         {
            id: "REQ007",
            itemName: "Software Licenses",
            department: "IT",
            date: "2023-02-15",
            amount: 2000,
            status: "Approved",
         },
         {
            id: "REQ008",
            itemName: "Coffee Machine",
            department: "HR",
            date: "2023-02-18",
            amount: 300,
            status: "Draft",
         },
         {
            id: "REQ009",
            itemName: "Projector",
            department: "Marketing",
            date: "2023-02-20",
            amount: 700,
            status: "Pending",
         },
         {
            id: "REQ010",
            itemName: "External Hard Drive",
            department: "IT",
            date: "2023-02-25",
            amount: 250,
            status: "Approved",
         },
         {
            id: "REQ011",
            itemName: "Whiteboard Markers",
            department: "Admin",
            date: "2023-03-01",
            amount: 50,
            status: "Approved",
         },
         {
            id: "REQ012",
            itemName: "Networking Cables",
            department: "IT",
            date: "2023-03-05",
            amount: 120,
            status: "Pending",
         },
         {
            id: "REQ013",
            itemName: "Ergonomic Keyboards",
            department: "HR",
            date: "2023-03-08",
            amount: 400,
            status: "Approved",
         },
         {
            id: "REQ014",
            itemName: "Subscription Renewal",
            department: "Marketing",
            date: "2023-03-10",
            amount: 600,
            status: "Rejected",
         },
         {
            id: "REQ015",
            itemName: "New Desks",
            department: "HR",
            date: "2023-03-12",
            amount: 1500,
            status: "Approved",
         },
      ];
      setRequests(fetchedRequests);
   }, []);

   const handleRequestSort = (property: keyof Request) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
   };

   const sortedRequests = useMemo(() => {
      const array = [...requests];
      return array.sort((a, b) => {
         const aValue = a[orderBy as keyof Request];
         const bValue = b[orderBy as keyof Request];

         if (typeof aValue === "string" && typeof bValue === "string") {
            return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
         } else if (typeof aValue === "number" && typeof bValue === "number") {
            return order === "asc" ? aValue - bValue : bValue - aValue;
         }
         return 0;
      });
   }, [requests, order, orderBy]);

   const filteredRequests = sortedRequests.filter((request) => {
      const matchesSearchTerm =
         request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      return matchesSearchTerm && matchesStatus;
   });

   const paginatedRequests = useMemo(() => {
      return filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
   }, [filteredRequests, page, rowsPerPage]);

   const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleClearFilters = () => {
      setSearchTerm("");
      setStatusFilter("All");
      setPage(0);
   };

   const getStatusChipColor = (status: Request["status"]) => {
      switch (status) {
         case "Approved":
            return "success";
         case "Pending":
            return "warning";
         case "Rejected":
            return "error";
         default:
            return "default";
      }
   };

   return {
      getStatusChipColor,
      handleClearFilters,
      handleChangeRowsPerPage,
      handleChangePage,
      paginatedRequests,
      filteredRequests,
      handleRequestSort,
      headCells,
      searchTerm,
      setSearchTerm,
      statusFilter,
      setStatusFilter,
      orderBy,
      order,
      page,
      rowsPerPage,
   };
};

export default useGetDemandAchatList;
