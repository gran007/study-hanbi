import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/05.util/axios";

interface CreateProjectDto {
  readonly name: string;
}

interface UpdateProjectDto {
  readonly id: number;
  readonly name: string;
}

interface DeleteProjectDto {
  readonly id: number;
}

export function useProjectListQuery() {
  return useQuery({
    queryKey: ['project', 'list'],
    queryFn: async () => {
      return await axios.get('/project/user');
    },
  });
};

export function useAddProjectQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateProjectDto) => {
      return await axios.post('/project', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project', 'list'],
      });
      clear();
    }
  });
};

export function useUpdateProjectQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdateProjectDto) => {
      return await axios.patch('/project', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project', 'list'],
      });
      clear();
    }
  });
};

export function useDeleteProjectQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: DeleteProjectDto) => {
      return await axios.delete('/project', { data: dto })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['project', 'list'],
      });
      clear();
    }
  });
};