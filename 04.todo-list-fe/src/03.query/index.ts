import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/02.component/axios";
// import { TodoApi } from "../api/TodoApi";

export const useProjectListQuery = () => {
  return useQuery({
    queryKey: ['project','list'],
    queryFn: async () => {
      return await axios.get('/project/user');
    },
  });
};