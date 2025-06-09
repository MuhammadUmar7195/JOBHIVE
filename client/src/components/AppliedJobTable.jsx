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
import { useSelector } from "react-redux";

const statusBadge = (status) => {
  switch (status) {
    case "accepted":
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold">
          <BadgeCheckIcon className="w-4 h-4" /> Accepted
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold">
          <Loader2 className="w-4 h-4 animate-spin" /> Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold">
          <XCircle className="w-4 h-4" /> Rejected
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold">
          <Clock className="w-4 h-4" /> Unknown
        </Badge>
      );
  }
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((state) => state?.job);

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
          {allAppliedJobs && allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-[#f9f5ff] transition">
                <TableCell>
                  {appliedJob?.createdAt
                    ? appliedJob.createdAt.split("T")[0]
                    : "N/A"}
                </TableCell>
                <TableCell className="font-semibold text-[#7209b7]">
                  {appliedJob.job?.title.toUpperCase() || "N/A"}
                </TableCell>
                <TableCell>
                  {appliedJob.job?.company?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {statusBadge(appliedJob.status)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
