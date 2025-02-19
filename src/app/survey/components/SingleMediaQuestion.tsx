import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface SingleMediaQuestionProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  media: string[];
  question: string | React.ReactNode;
  compact?: boolean;
}

const marks = [
  { value: 0, label: 'Wcale' },
  { value: 20, label: '' },
  { value: 40, label: '' },
  { value: 60, label: '' },
  { value: 80, label: '' },
  { value: 100, label: 'W bardzo dużym stopniu' },
];

const SingleMediaQuestion = ({
  register,
  name,
  media,
  question,
  compact = false,
}: SingleMediaQuestionProps) => {
  return (
    <div className={`space-y-2 ${compact ? 'my-0' : 'my-4'} pb-2`}>
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

      {/* Only show question text if not in compact mode */}
      {!compact && <h3 className="text-lg font-medium">{question}</h3>}

      {/* Compact version only shows the slider and labels */}
      <div className="w-full">
        <div className="mb-0 text-sm font-medium">{question}</div>
        <input
          style={{
            width: '100%',
            height: '40px',
          }}
          type="range"
          min="0"
          max="100"
          step="1"
          {...register(name)}
        />
        {/* Marks */}
        <div
          style={{
            marginTop: -12,
          }}
          className="relative mt-0 w-full pb-[15px]"
        >
          <div className="flex justify-between px-[5px]">
            {marks.map((mark) => (
              <div
                key={mark.value}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${mark.value}%`,
                  transform: 'translateX(-50%)',
                  width: mark.label ? '120px' : '40px',
                }}
              >
                <div
                  className={`mb-0.5 w-[2px] bg-gray-400 ${
                    mark.value === 0 || mark.value === 100 ? 'h-2' : 'h-1.5'
                  }`}
                />
                <span className="text-sm font-medium">{mark.value}</span>
                {mark.label && (
                  <span className="mt-1 text-center text-xs">{mark.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMediaQuestion;
