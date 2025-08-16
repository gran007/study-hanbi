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
  readonly name: string;
}

interface UpdateSubTaskOrder {
  readonly id: number;
  readonly orderNo: number;
}

interface DeleteSubTaskDto {
  readonly id: number;
}

interface DeleteAndUpdateOrder {
  subTask: DeleteSubTaskDto;
  subTaskList: UpdateSubTaskOrder[];
}

export function useSubTaskListQuery(taskId: number) {
  return useQuery({
    queryKey: ['subTask', 'list'],
    queryFn: async () => {
      return await axios.get(`/sub-task/task/${taskId}`);
    },
  });
};

export function useAddSubTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateSubTaskDto) => {
      return await axios.post('/sub-task', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subTask', 'list'],
      });
      clear();
    }
  });
};

export function useUpdateSubTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdateSubTaskDto) => {
      return await axios.patch('/sub-task', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subTask', 'list'],
      });
      clear();
    }
  });
};


export function useDeleteSubTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: DeleteAndUpdateOrder) => {
      await axios.delete('/sub-task', { data: dto.subTask });
      await axios.patch('/sub-task/order', dto.subTaskList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subTask', 'list'],
      });
      clear();
    }
  });
};
