import { Plus, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useCallback, useState } from 'react';

import LogoImage from '../../assets/HabitsLogo.svg';
import { NewHabitForm } from '../NewHabitForm';

export function Header() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const changeClass = useCallback((value: boolean) => {
    if (value) {
      return 'text-white';
    }
    return 'text-violet-500';
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={LogoImage} alt="Habits Logo" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-600 hover:bg-violet-800 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {}}
        >
          <Plus size={20} fontWeight="600" className={changeClass(isHovered)} />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
              <X size={24} fontWeight={600} aria-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className="text-3xl leading-tight font-extrabold">
              Criar Hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
