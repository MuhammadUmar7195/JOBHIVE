import { COMPANY_API_END_POINT } from "../utils/api.constant.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setCompanies } from "@/store/Slices/company.slice.js";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setCompanies(res?.data?.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
