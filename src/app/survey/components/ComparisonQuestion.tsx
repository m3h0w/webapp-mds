import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface ComparisonQuestionProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  leftMedia: string[];
  rightMedia: string[];
  question?: string;
}

const marks = [
  { value: 0, label: 'Wcale' },
  { value: 20, label: '' },
  { value: 40, label: '' },
  { value: 60, label: '' },
  { value: 80, label: '' },
  { value: 100, label: 'W bardzo dużym stopniu' },
];

const ComparisonQuestion = ({
  register,
  name,
  leftMedia,
  rightMedia,
  question,
}: ComparisonQuestionProps) => {
  return (
    <div
      style={{
        marginTop: -60,
      }}
      className="my-0 size-full space-y-0"
    >
      <style jsx>{`
        input[type='range'] {
          @apply w-full h-16 bg-gray-200 rounded-lg appearance-none cursor-pointer;
        }

        input[type='range']::-webkit-slider-thumb {
          @apply w-20 h-20 bg-blue-600 rounded-full appearance-none cursor-pointer;
          -webkit-appearance: none;
        }

        input[type='range']::-moz-range-thumb {
          @apply w-20 h-20 bg-blue-600 rounded-full cursor-pointer border-0;
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

      {question && <h3 className="text-lg font-medium">{question}</h3>}

      {/* Media comparison container */}
      <div className="flex size-full justify-between gap-1">
        <div
          className={`grid size-full w-1/2 grid-cols-2 gap-2 rounded-lg p-4 ${
            leftMedia.length > 1 ? 'border-2 border-black' : ''
          }`}
        >
          {leftMedia.map((src, index) => (
            <div
              key={`left-${index}`}
              className={`relative aspect-video ${leftMedia.length === 1 ? 'col-span-2 size-full' : ''}`}
            >
              <Image
                src={src}
                alt={`Left comparison ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
        <div
          className={`grid size-full w-1/2 grid-cols-2 gap-2 rounded-lg p-4 ${
            rightMedia.length > 1 ? 'border-2 border-black' : ''
          }`}
        >
          {rightMedia.map((src, index) => (
            <div
              key={`right-${index}`}
              className={`relative aspect-video ${rightMedia.length === 1 ? 'col-span-2 size-full' : ''}`}
            >
              <Image
                src={src}
                alt={`Right comparison ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slider container */}
      <div className="mt-8 w-full">
        <input
          style={{
            width: '100%',
            height: '40px',
          }}
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={50}
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

export default ComparisonQuestion;
