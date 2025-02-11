import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface ComparisonQuestionProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  leftMedia: string;
  rightMedia: string;
  question: string;
}

const marks = [
  { value: 0, label: 'Nieodróżnialne' },
  { value: 20, label: 'Nieznacznie różne' },
  { value: 40, label: 'Istotnie różne' },
  { value: 60, label: 'Wyraźnie różne' },
  { value: 80, label: 'Silnie różne' },
  { value: 100, label: 'Skrajnie różne' },
];

const ComparisonQuestion = ({
  register,
  name,
  leftMedia,
  rightMedia,
  question,
}: ComparisonQuestionProps) => {
  return (
    <div className="space-y-4">
      <style jsx>{`
        input[type='range'] {
          @apply w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer;
        }

        input[type='range']::-webkit-slider-thumb {
          @apply w-4 h-4 bg-blue-600 rounded-full appearance-none cursor-pointer;
          -webkit-appearance: none;
        }

        input[type='range']::-moz-range-thumb {
          @apply w-4 h-4 bg-blue-600 rounded-full cursor-pointer border-0;
        }

        input[type='range']:focus {
          @apply outline-none;
        }

        input[type='range']:focus::-webkit-slider-thumb {
          @apply ring-2 ring-blue-300;
        }

        input[type='range']:focus::-moz-range-thumb {
          @apply ring-2 ring-blue-300;
        }
      `}</style>

      <h3 className="text-lg font-medium">{question}</h3>

      {/* Media comparison container */}
      <div className="flex justify-between gap-2">
        <div className="relative aspect-video w-1/2">
          <Image
            src={leftMedia}
            alt="Left comparison"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-video w-1/2">
          <Image
            src={rightMedia}
            alt="Right comparison"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Slider container */}
      <div className="mt-8 w-full">
        <input
          style={{
            width: '100%',
          }}
          type="range"
          min="0"
          max="100"
          step="1"
          {...register(name)}
        />
        {/* Marks */}
        <div className="relative mt-2 w-full">
          <div className="flex justify-between">
            {marks.map((mark) => (
              <div
                key={mark.value}
                className="flex flex-col items-center"
                style={{ width: 'auto', minWidth: '60px' }}
              >
                <span className="text-sm font-medium">{mark.value}</span>
                <span className="mt-1 text-center text-xs">{mark.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonQuestion;
