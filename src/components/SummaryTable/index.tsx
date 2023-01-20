import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { getSummary } from '../../services/Summary';
import { ISummary } from '../../services/Summary/types';
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning';
import { HabitDay } from '../HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  const [summaryData, setSummaryData] = useState<ISummary[]>([] as ISummary[]);

  const getSummaryData = useCallback(async () => {
    const result = await getSummary();

    if (!result) {
      alert('Error getting summary data');
      return;
    }

    if (result.data) {
      setSummaryData(result.data);
    }
  }, []);

  useEffect(() => {
    getSummaryData();
  }, []);

  useEffect(() => {
    console.log('Summary', summaryData);
  }, [summaryData]);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekday, i) => {
          return (
            <div
              key={`${weekday}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
            >
              {weekday}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summaryData.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({
            length: amountOfDaysToFill,
          }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
