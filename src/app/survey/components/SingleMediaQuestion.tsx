import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface SingleMediaQuestionProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  media: string[];
  question: string | React.ReactNode;
  onTouch: (name: string) => void;
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
  onTouch,
}: SingleMediaQuestionProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleInteraction = () => {
    if (!isTouched) {
      setIsTouched(true);
      onTouch(name);
    }
  };

  return (
    <div className={`space-y-2 ${compact ? 'my-0' : 'my-4'} pb-2`}>
      <style jsx>{`
        input[type='range'] {
          -webkit-appearance: none;
          @apply w-full bg-transparent;
          width: 100%;
          height: 40px;
          margin: 10px 0;
        }

        input[type='range']::-webkit-slider-runnable-track {
          @apply w-full rounded-full;
          height: 4px;
          background: ${isTouched ? '#3b82f6' : '#e2e8f0'};
          border: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          @apply bg-blue-600 rounded-full cursor-pointer;
          width: 16px;
          height: 32px;
          margin-top: -14px;
          border: 4px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          transition: all 0.4s ease;
          cursor: pointer;
          /* on hover, scale up */
          &:hover {
            transform: scale(1.1);
          }
        }

        input[type='range']::-moz-range-track {
          @apply w-full rounded-full;
          height: 4px;
          background: ${isTouched ? '#3b82f6' : '#e2e8f0'};
          border: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }

        input[type='range']::-moz-range-thumb {
          @apply bg-blue-600 rounded-full cursor-pointer border-0;
          width: 16px;
          height: 16px;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          transition: all 0.2s ease;
        }

        input[type='range']:focus {
          @apply outline-none;
        }

        input[type='range']:focus::-webkit-slider-thumb {
          @apply ring-4 ring-blue-200;
          transform: scale(1.1);
        }

        input[type='range']:focus::-moz-range-thumb {
          @apply ring-4 ring-blue-200;
          transform: scale(1.1);
        }

        input[type='range']:hover::-webkit-slider-thumb {
          @apply bg-blue-700;
          transform: scale(1.1);
        }

        input[type='range']:hover::-moz-range-thumb {
          @apply bg-blue-700;
          transform: scale(1.1);
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
            marginTop: 6,
          }}
          type="range"
          min="0"
          max="100"
          step="1"
          onTouchStart={handleInteraction}
          onMouseDown={handleInteraction}
          {...register(name)}
        />
        {/* Marks */}
        <div
          style={{
            marginTop: -12,
            width: 'calc(100% - 16px)',
            marginLeft: '8px',
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
