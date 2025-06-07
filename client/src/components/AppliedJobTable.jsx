import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { BadgeCheckIcon, Clock, XCircle, Loader2 } from "lucide-react";

// Dummy data for demonstration
const appliedJobs = [
  {
    date: "2024-06-01",
    title: "Frontend Developer",
    company: "TechNova",
    status: "accepted",
  },
  {
    date: "2024-05-20",
    title: "Backend Developer",
    company: "DataWorks",
    status: "pending",
  },
  {
    date: "2024-05-10",
    title: "UI/UX Designer",
    company: "Designify",
    status: "rejected",
  },
];

const statusBadge = (status) => {
  switch (status) {
    case "accepted":
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <BadgeCheckIcon className="w-4 h-4" /> Accepted
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <Loader2 className="w-4 h-4 animate-spin" /> Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
          <XCircle className="w-4 h-4" /> Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
          <Clock className="w-4 h-4" /> Unknown
        </Badge>
      );
  }
};

const AppliedJobTable = () => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow border border-gray-100 bg-white">
      <Table>
        <TableCaption className="text-base font-semibold text-[#F83002] mb-2">
          A List of your Applied Jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-[#f3e8ff]">
            <TableHead className="text-[#6A38C2] font-bold">Date</TableHead>
            <TableHead className="text-[#6A38C2] font-bold">Job Role</TableHead>
            <TableHead className="text-[#6A38C2] font-bold">Company</TableHead>
            <TableHead className="text-[#6A38C2] font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.map((job, idx) => (
            <TableRow key={idx} className="hover:bg-[#f7faff] transition">
              <TableCell>{job.date}</TableCell>
              <TableCell className="font-semibold">{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{statusBadge(job.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {appliedJobs.length === 0 && (
        <div className="text-center text-gray-400 py-8">No applied jobs yet.</div>
      )}
    </div>
  );
};

export default AppliedJobTable;
