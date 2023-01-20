import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import { Check } from 'phosphor-react';
import { FormEvent, useCallback, useState } from 'react';
import { createANewHabit } from '../../services/Habit';
import { ICreateHabitParams } from '../../services/Habit/types';
import { PopoverAlert } from '../PopoverAlert';

const availableWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [isIncomplete, setIsIncomplete] = useState<boolean>(true);

  const postNewHabit = useCallback(
    async (sendTitle: string, sendWeekDays: number[]) => {
      const result = await createANewHabit({
        title: sendTitle,
        weekDays: sendWeekDays,
      });

      if (!result.data) {
        alert('Houve um erro ao cadastrar o habito');
      }

      alert(result.message);
      
    },
    []
  );

  function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      setIsIncomplete(true);
      return;
    }

    setIsIncomplete(false);
    postNewHabit(title, weekDays);
    setTitle('');
    setWeekDays([]);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];

      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex. Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              className="flex items-center gap-3 group"
              key={weekDay}
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" weight="bold" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <Popover.Root>
        <Popover.Trigger
          type="submit"
          className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-500 hover:bg-green-700"
        >
          <Check size={20} weight="bold" />
          Confirmar
        </Popover.Trigger>
        {isIncomplete && (
          <PopoverAlert
            title="Atenção!"
            message="É Necessário um Título e selecionar ao menos um dia da semana para criar um hábito."
          />
        )}
      </Popover.Root>
    </form>
  );
}
