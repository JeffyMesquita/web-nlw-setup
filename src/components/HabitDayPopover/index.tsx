import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, X } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { getDay } from '../../services/Day';
import { IPossibleHabits } from '../../services/Day/types';

interface HabitDayPopoverProps {
  date: Date;
}

export function HabitDayPopover({ date }: HabitDayPopoverProps) {
  const [possibleHabitsForToday, setPossibleHabitsForToday] = useState(
    [] as IPossibleHabits[]
  );

  const getHabitDay = useCallback(async (date: Date) => {
    const result = await getDay(date.toISOString());

    console.log(result);

    if (result.data?.possibleHabits) {
      setPossibleHabitsForToday(result.data.possibleHabits);
    }
  }, []);

  useEffect(() => {
    getHabitDay(date);
  }, []);

  useEffect(() => {
    console.log(possibleHabitsForToday);
  }, [possibleHabitsForToday]);

  return (
    <>
      {possibleHabitsForToday && (
        <>
          {possibleHabitsForToday.map((possibleHabit) => (
            <div className="mt-6 flex flex-cl gap-3">
              <Checkbox.Root
                className="flex items-center gap-3 group"
                key={possibleHabit.id}
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" weight="bold" />
                  </Checkbox.Indicator>
                </div>

                <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500">
                  {possibleHabit.title}
                </span>
              </Checkbox.Root>
            </div>
          ))}
        </>
      )}
    </>
  );
}
