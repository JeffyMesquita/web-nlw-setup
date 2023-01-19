interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-1">
      <div
        className="h-3 rounded-xl bg-violet-600"
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-value={progress}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
