import { setSingleCompany } from "@/store/Slices/company.slice";
import { COMPANY_API_END_POINT } from "@/utils/api.constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!companyId) return;
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );
        console.log(res?.data?.company);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
