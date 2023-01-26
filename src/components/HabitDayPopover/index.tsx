import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { getDay } from '../../services/Day';
import { toggleHabit } from '../../services/Habit';
import { IPossibleHabits } from '../../services/Day/types';

interface HabitDayPopoverProps {
  date: Date;
}

interface HabitsInfo {
  possibleHabits: IPossibleHabits[];
  completedHabits: string[];
}

export function HabitDayPopover({ date }: HabitDayPopoverProps) {
  const [habitsInfoToday, setHabitsInfoToday] = useState({} as HabitsInfo);

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  const getHabitDay = useCallback(async (date: Date) => {
    console.log('getHabitDay', date);

    const result = await getDay(date.toISOString());

    console.log(result);

    if (result?.data) {
      setHabitsInfoToday(result.data);
    }
  }, []);

  const handleToggleHabitDay = useCallback(async (habitId: string) => {
    const result = await toggleHabit(habitId);

    // if (result) {

    // }

    let completedHabits: string[] = [];
    const isHabitAlreadyCompleted =
      habitsInfoToday?.completedHabits.includes(habitId);

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfoToday!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfoToday!.completedHabits, habitId];
    }
    setHabitsInfoToday({
      possibleHabits: habitsInfoToday!.possibleHabits,
      completedHabits,
    });
  }, []);

  useEffect(() => {
    getHabitDay(date);
  }, []);

  return (
    <div className="mt-6 flex flex-cl gap-3">
      {habitsInfoToday?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            className="flex items-center gap-3 group"
            key={habit.id}
            onCheckedChange={() => handleToggleHabitDay(habit.id)}
            checked={habitsInfoToday.completedHabits.includes(habit?.id)}
            disabled={isDateInPast}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" weight="bold" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
