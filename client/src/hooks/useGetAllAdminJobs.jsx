import { useEffect } from "react";
import { JOB_API_ENDPOINT } from "@/utils/api.constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "@/store/Slices/jobs.slice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
