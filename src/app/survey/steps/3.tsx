import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { useMemo } from 'react';
import Image from 'next/image';

import SingleMediaQuestion from '../components/SingleMediaQuestion';

interface Page3Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onBack: () => void;
  onNext: () => void;
}

const PYTANIE =
  'Dla poniższych efektów zniekształcenia obrazu oceń na ile podobały Ci się one wizualnie, tak że miałaś/miałeś przyjemność z ich oglądania? ';

const Page3 = ({ register, errors, trigger, onBack, onNext }: Page3Props) => {
  const questions = useMemo(() => {
    const questionData = [
      {
        name: 'singleVisual1',
        media: ['/1.webp', '/2.webp', '/1.webp', '/2.webp', '/1.webp'],
      },
      {
        name: 'singleVisual2',
        media: ['/2.webp', '/1.webp', '/2.webp', '/1.webp', '/2.webp'],
      },
      {
        name: 'singleVisual3',
        media: ['/1.webp', '/2.webp', '/1.webp', '/2.webp', '/1.webp'],
      },
      {
        name: 'singleVisual4',
        media: ['/2.webp', '/1.webp', '/2.webp', '/1.webp', '/2.webp'],
      },
      {
        name: 'singleVisual5',
        media: ['/1.webp', '/2.webp', '/1.webp', '/2.webp', '/1.webp'],
      },
      {
        name: 'singleVisual6',
        media: ['/2.webp', '/1.webp', '/2.webp', '/1.webp', '/2.webp'],
      },
    ];

    return [...questionData].sort(() => Math.random() - 0.5);
  }, []);

  const handleNext = async () => {
    const isValid = await trigger([
      'singleVisual1',
      'singleVisual2',
      'singleVisual3',
      'singleVisual4',
      'singleVisual5',
      'singleVisual6',
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex h-[98vh]">
      {/* Left side - GIFs (2/3 width) */}
      <div className="grid w-7/12 grid-cols-2 gap-4 overflow-y-auto p-2 pl-10">
        {questions.map((q, index) => (
          <div key={q.name} className="relative aspect-video h-[30vh]">
            <div className="absolute left-2 top-2 z-10 flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
              <span className="text-lg font-bold text-black">{index + 1}</span>
            </div>
            <Image
              src={q.media[0]}
              alt={q.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      {/* Right side - Sliders (1/3 width) */}
      <div className="w-5/12 space-y-8 overflow-y-auto p-8 pr-14">
        <h3 className="mb-6 text-lg font-medium">{PYTANIE}</h3>

        {questions.map((q) => (
          <SingleMediaQuestion
            key={q.name}
            register={register}
            name={q.name}
            media={q.media}
            question={
              <div className="flex items-center gap-2">
                <div className="relative flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
                  <span className="text-lg font-bold text-black">
                    {questions.indexOf(q) + 1}
                  </span>
                </div>
                <span className="text-lg font-medium">| Efekt</span>
                <span className="text-lg font-medium">
                  {questions.indexOf(q) + 1}
                </span>
              </div>
            }
            compact={true}
          />
        ))}

        <div className="mt-8 flex justify-between pt-8">
          <button
            type="button"
            onClick={onBack}
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
          >
            Wstecz
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page3;
