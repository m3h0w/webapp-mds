import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { useMemo } from 'react';

import ComparisonQuestion from '../components/ComparisonQuestion';
import { index } from 'd3';

interface Page1Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
}

const Page1 = ({ register, errors, trigger, onNext }: Page1Props) => {
  const questions = useMemo(() => {
    const media1 = ['/1-output.gif'];
    const media2 = ['/3-output.gif'];
    const media3 = ['/5-output.gif'];
    const questionData = [
      {
        name: 'visualComparison1',
        mediaA: media1,
        mediaB: media2,
      },
      {
        name: 'visualComparison2',
        mediaA: media3,
        mediaB: media1,
      },
      {
        name: 'visualComparison3',
        mediaA: media3,
        mediaB: media2,
      },
    ];

    // Randomize both question order and left/right media order
    return [...questionData]
      .sort(() => Math.random() - 0.5)
      .map(({ name, mediaA, mediaB }) => ({
        name,
        leftMedia: Math.random() < 0.5 ? mediaA : mediaB,
        rightMedia: Math.random() < 0.5 ? mediaB : mediaA,
      }));
  }, []);

  const handleNext = async () => {
    const isValid = await trigger([
      'visualComparison1',
      'visualComparison2',
      'visualComparison3',
      'intensity',
      'frequency',
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-0 p-4 md:grid-cols-2">
      {questions.map((q, index) => (
        <div
          key={q.name}
          className={`mx-auto h-[calc(38vh-2rem)] ${
            index === 2 ? 'md:col-start-1 md:col-end-2' : ''
          }`}
          style={{
            width: '90%',
            transform: `${index === 2 ? 'translateX(50%)' : ''}`,
          }}
        >
          <ComparisonQuestion
            key={q.name}
            register={register}
            name={q.name}
            leftMedia={q.leftMedia}
            rightMedia={q.rightMedia}
            question="Na ile przedstawione efekty zniekształceń obrazu różnią się od siebie wizualnie w Twojej ocenie?"
          />
        </div>
      ))}

      <div className="absolute bottom-10 right-10">
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

export default Page1;
