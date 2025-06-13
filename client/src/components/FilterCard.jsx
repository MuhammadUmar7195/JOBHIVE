import { setSearchedQuery } from "@/store/Slices/jobs.slice";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Lahore", "Karachi", "Multan", "Islamabad", "Faisalabad", "Quetta"],
  },
  {
    filterType: "Industry",
    key: "industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "Machine Learning Engineer",
      "DevOps Engineer",
    ],
  },
];

const FilterCard = () => {
  const defaultFilters = {
    location: "",
    industry: "",
  };
  
  const [filters, setFilters] = useState(defaultFilters);
  const dispatch = useDispatch();

  // Update Redux or parent with all filters
  useEffect(() => {
    dispatch(setSearchedQuery(filters));
  }, [filters, dispatch]);

  // Handler for each filter group
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const resetFilter = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="mt-10">
      <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-[#F83002] w-6 h-6" />
          <h1 className="font-extrabold text-xl text-gray-800 tracking-tight">
            Filter Jobs
          </h1>
        </div>
        <hr className="mb-4 border-[#f3e8ff]" />
        {filterData.map((data, index) => (
          <div key={data.filterType} className="mb-6">
            <h2 className="font-semibold text-[#6A38C2] text-base mb-2">
              {data.filterType}
            </h2>
            <RadioGroup
              value={filters[data.key]}
              onValueChange={(value) => handleChange(data.key, value)}
              className="space-y-2"
            >
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2" key={itemId}>
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="border-[#F83002] focus:ring-[#F83002]"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-700 cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
        <Button
          className="ml-0.5 bg-gray-200 text-[#F83002] hover:bg-[#F83002] hover:text-white font-semibold px-4 py-2 rounded transition cursor-pointer"
          onClick={resetFilter}
          type="button"
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;
