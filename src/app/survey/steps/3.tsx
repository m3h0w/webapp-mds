import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { useMemo } from 'react';

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
    <div className="grid grid-cols-1 gap-16 px-4 md:grid-cols-1">
      {questions.map((q) => (
        <div
          key={q.name}
          className="mx-auto"
          style={{ width: '92vw', height: '100vh' }}
        >
          <SingleMediaQuestion
            key={q.name}
            register={register}
            name={q.name}
            media={q.media}
            question={PYTANIE}
          />
        </div>
      ))}

      <div className="flex justify-between">
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
  );
};

export default Page3;
