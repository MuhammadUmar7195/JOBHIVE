import { useDispatch } from "react-redux";
import { setAllJobs } from "@/store/Slices/jobs.slice";
import { useEffect } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/api.constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          dispatch(setAllJobs(res?.data?.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
