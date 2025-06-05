import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCard = ({ job }) => {
  return (
    <div
      className="group p-6 rounded-2xl shadow-lg bg-white border border-gray-100 cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 min-h-[260px]"
    >
      {/* Header: Company and Location */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg text-gray-900 group-hover:text-[#F83002] transition">{job?.company?.name}</h1>
          <p className="text-xs text-gray-500 mt-1">Pakistan</p>
        </div>
      </div>
      {/* Job Title & Description */}
      <div>
        <h2 className="font-extrabold text-xl text-[#F83002] mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <Badge className="text-blue-700 font-bold bg-blue-50 border border-blue-100">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold bg-[#fff0ee] border border-[#ffe5e0]">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold bg-purple-50 border border-purple-100">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard