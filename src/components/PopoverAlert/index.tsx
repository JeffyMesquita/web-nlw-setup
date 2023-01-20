import * as Popover from '@radix-ui/react-popover';
import { X } from 'phosphor-react';

interface PopoverAlertProps {
  title: string;
  message: string;
}

export function PopoverAlert({ title, message }: PopoverAlertProps) {
  return (
    <Popover.Portal>
      <Popover.Content className="min-w-[500px] p-6 rounded-2xl bg-zinc-700 flex flex-col">
        <Popover.Arrow className="fill-zinc-700 " height={12} width={24} />
        <Popover.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
          <X size={24} fontWeight={600} aria-label="Fechar" />
        </Popover.Close>

        <div className='flex flex-col justify-center items-center'>
          <span className="mt-1 font-extrabold leading-tight text-3xl text-red-500">
            {title}
          </span>
          <span className="font-semibold text-zinc-400">{message}</span>
        </div>

      </Popover.Content>
    </Popover.Portal>
  );
}
