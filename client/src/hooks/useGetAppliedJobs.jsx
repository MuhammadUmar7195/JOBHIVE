import { setAllAppliedJobs } from "@/store/Slices/jobs.slice";
import { APPLICATION_API_ENDPOINT } from "@/utils/api.constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          dispatch(setAllAppliedJobs(res?.data?.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
