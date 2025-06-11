import { APPLICATION_API_ENDPOINT } from "@/utils/api.constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <Table className="min-w-[700px]">
        <TableCaption className="text-gray-400 pb-4">
          A list of your recent applicants
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-700">Full Name</TableHead>
            <TableHead className="font-bold text-gray-700">Email</TableHead>
            <TableHead className="font-bold text-gray-700">Contact</TableHead>
            <TableHead className="font-bold text-gray-700">Resume</TableHead>
            <TableHead className="font-bold text-gray-700">Date</TableHead>
            <TableHead className="text-right font-bold text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-[#f3e8ff]/40 transition"
              >
                <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="bg-[#f3e8ff] text-[#7209b7] px-2 py-1 rounded text-xs font-semibold">
                    {item?.applicant.createdAt.split("T")[0]}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-[#F83002] transition" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className={`flex w-fit items-center my-2 px-2 py-1 rounded cursor-pointer hover:bg-[#f3e8ff] transition ${
                            status === "Accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
      {(!applicants?.applications || applicants.applications.length === 0) && (
        <div className="text-center text-gray-400 py-8 text-lg">
          No applicants found for this job.
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;