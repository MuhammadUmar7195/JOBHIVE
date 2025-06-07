import { useDispatch } from "react-redux";
import { setAllJobs } from "@/store/Slices/jobs.slice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`/api/v1/job/get`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          dispatch(setAllJobs(res?.data?.job));
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching jobs");
      }
    };
    fetchJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
