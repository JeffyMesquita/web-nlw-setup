interface HabitProps {
  completed: number;
}

export function HabitDay({ completed }: HabitProps) {
  return (
    <div className="w-10 h10 bg-zinc-900 border-2 border-zinc-800 rounded-lg"></div>
  );
}
