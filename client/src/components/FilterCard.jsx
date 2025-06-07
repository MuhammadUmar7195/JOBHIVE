import { setSearchedQuery } from "@/store/Slices/jobs.slice";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Filter } from "lucide-react";

const fitlerData = [
	{
		fitlerType: "Location",
		array: ["Lahore", "Karachi", "Multan", "Islamabad", "Faisalabad", "Quetta"],
	},
	{
		fitlerType: "Industry",
		array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer"],
	},
	{
		fitlerType: "Salary",
		array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
	},
];

const FilterCard = () => {
	const [selectedValue, setSelectedValue] = useState("");
	const dispatch = useDispatch();
	const changeHandler = (value) => {
		setSelectedValue(value);
	};
	useEffect(() => {
		dispatch(setSearchedQuery(selectedValue));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);

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
				<RadioGroup
					value={selectedValue}
					onValueChange={changeHandler}
					className="space-y-6"
				>
					{fitlerData.map((data, index) => (
						<div key={data.fitlerType} className="mb-2">
							<h2 className="font-semibold text-[#6A38C2] text-base mb-2">
								{data.fitlerType}
							</h2>
							<div className="flex flex-col gap-2">
								{data.array.map((item, idx) => {
									const itemId = `id${index}-${idx}`;
									return (
										<div
											className="flex items-center space-x-2"
											key={itemId}
										>
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
							</div>
						</div>
					))}
				</RadioGroup>
			</div>
		</div>
	);
};

export default FilterCard;
