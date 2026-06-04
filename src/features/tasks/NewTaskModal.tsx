import { Modal } from '@/components/ui/Modal';
import { NewTaskForm } from './NewTaskForm';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setNewTaskModal } from '@/features/ui/uiSlice';

export function NewTaskModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.newTaskModalOpen);
  const close = () => dispatch(setNewTaskModal(false));

  return (
    <Modal open={open} title="Nova Tarefa" onClose={close}>
      <NewTaskForm onCreated={close} />
    </Modal>
  );
}
