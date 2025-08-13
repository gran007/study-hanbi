import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/05.util/axios";

interface CreateSubTaskDto {
  readonly projectId: number;
  readonly taskId: number;
  readonly priority: number;
  readonly orderNo: number;
  readonly name: string;
}

interface UpdateSubTaskDto {
  readonly id: number;
  readonly taskId: number;
  readonly priority: number;
  readonly name: string;
}

interface UpdateSubTaskOrder {
  readonly id: number;
  readonly orderNo: number;
}

interface DeleteSubTaskDto {
  readonly id: number;
}

export function useSubTaskListQuery(taskId: number) {
  return useQuery({
    queryKey: ['sub-task', 'list', taskId],
    queryFn: async () => {
      return await axios.get(`/sub-task/board/${taskId}`);
    },
  });
};

export function useAddSubTaskQuery(taskId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateSubTaskDto) => {
      return await axios.post('/sub-task', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sub-task', 'list', taskId],
      });
      clear();
    }
  });
};

export function useUpdateSubTaskQuery(taskId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdateSubTaskDto) => {
      return await axios.patch('/sub-task', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sub-task', 'list', taskId],
      });
      clear();
    }
  });
};

export function useUpdateSubTaskOrderQuery(taskId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dtoList: UpdateSubTaskOrder[]) => {
      return await axios.patch('/sub-task/order', dtoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sub-task', 'list', taskId],
      });
      clear();
    }
  });
};

export function useDeleteSubTaskQuery(taskId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: DeleteSubTaskDto) => {
      return await axios.delete('/sub-task', { data: dto })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sub-task', 'list', taskId],
      });
      clear();
    }
  });
};
