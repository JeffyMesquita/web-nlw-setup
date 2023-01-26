import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { X } from 'phosphor-react';

import dayjs from 'dayjs';
import { HabitDayPopover } from '../HabitDayPopover';
import { ProgressBar } from '../ProgressBar';
import { useState } from 'react';
import { HabitsList } from '../HabiltList';

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay({
  amount = 0,
  defaultCompleted = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h10 border-2 rounded-lg hover:border-zinc-400 ', {
          'bg-violet-900 border-violet-700': completedPercentage >= 80,
          'bg-violet-800 border-violet-600':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-700 border-violet-500':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500':
            completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-500 border-violet-400 ':
            completedPercentage > 0 && completedPercentage < 20,
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <Popover.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
            <X size={24} fontWeight={600} aria-label="Fechar" />
          </Popover.Close>
          <Popover.Arrow className="fill-zinc-900 " height={8} width={16} />

          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <span className="font-semibold text-zinc-700 mt-3 text-xs">{`${completedPercentage}% dos hábitos completos.`}</span>
          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          {/* <HabitDayPopover
            date={date}
            onCompletedChanged={handleCompletedChanged}
          /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
