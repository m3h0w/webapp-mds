import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface SingleMediaQuestionProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  media: string[];
  question: string;
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
}: SingleMediaQuestionProps) => {
  return (
    <div className="my-4 space-y-4">
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

      {/* Media container */}
      <div className="grid grid-cols-3 gap-2">
        {media.map((src, index) => (
          <div key={index} className="relative aspect-video">
            <Image
              src={src}
              alt={`Media ${index + 1}`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
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
          <div className="flex justify-between px-[10px]">
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
