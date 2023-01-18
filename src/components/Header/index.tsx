import { Plus } from 'phosphor-react';
import { useCallback, useState } from 'react';

import LogoImage from '../../assets/HabitsLogo.svg';


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

      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 hover:bg-violet-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Plus size={20} fontWeight="600" className={changeClass(isHovered)} />
        Novo hábito
      </button>
    </div>
  );
}
