import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, MenuSquareIcon, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store?.company
  );

  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <>
      <div>
        <Table>
          <TableCaption>
            A list of your recent registered companies
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany?.map((company) => (
              <tr key={company?._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company?.logo || "https://github.com/shadcn.png"}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company?._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <MenuSquareIcon className="w-4 stroke-green-500" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company?._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Delete className="w-4 stroke-red-500" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
        {filterCompany.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-lg">
            No companies found.
          </div>
        )}
      </div>
    </>
  );
};

export default CompaniesTable;
