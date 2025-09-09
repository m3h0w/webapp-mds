import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
} from 'react-hook-form';
import { useMemo, useState } from 'react';

import ComparisonQuestion from '../components/ComparisonQuestion';

interface Page1Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
  onBack: () => void;
  getValues: UseFormGetValues<FieldValues>;
  format: string;
}

const Page1 = ({ register, trigger, onNext, onBack, format }: Page1Props) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const handleTouch = (fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  };

  const questions = useMemo(() => {
    const isLocalhost =
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_USE_BUCKET !== 'true';
    const media1 = [
      isLocalhost
        ? `/dd/High_strong.${format}`
        : `https://storage.googleapis.com/dd-vr-gifs/gifs2/High_strong.${format}`,
    ];
    const media2 = [
      isLocalhost
        ? `/dd/Mid_strong.${format}`
        : `https://storage.googleapis.com/dd-vr-gifs/gifs2/Mid_strong.${format}`,
    ];

    const questionData = [
      {
        name: 'high_vs_mid',
        mediaA: media1,
        mediaB: media2,
      },
    ];

    return questionData.map(({ name, mediaA, mediaB }) => {
      const randomize = Math.random() < 0.5;
      return {
        name,
        leftMedia: randomize ? mediaA : mediaB,
        rightMedia: randomize ? mediaB : mediaA,
      };
    });
  }, [format]);

  const handleNext = async () => {
    const requiredFields = ['high_vs_mid'];

    // Check if all fields have been touched
    const allFieldsTouched = requiredFields.every((field) =>
      touchedFields.has(field)
    );

    if (!allFieldsTouched) {
      alert('Proszę odpowiedzieć na wszystkie pytania przed przejściem dalej.');
      return;
    }

    const formValues = await trigger(requiredFields);
    if (formValues) {
      onNext();
    }
  };

  const allTouched = useMemo(() => {
    return questions.every((q) => touchedFields.has(q.name));
  }, [touchedFields, questions]);

  return (
    <div className="grid h-[125vh] grid-cols-1 gap-10 p-4 md:grid-cols-2">
      <h3
        style={{
          height: 2,
        }}
        className="col-span-full mb-0 text-center text-lg font-medium"
      >
        Na ile przedstawione efekty zniekształceń obrazu różnią się od siebie
        wizualnie w Twojej ocenie?
      </h3>

      {questions.map((q) => (
        <div
          key={q.name}
          className={`mx-auto h-[calc(45vh)]`}
          style={{
            width: '90%',
            transform: 'translateX(25%)',
          }}
        >
          <ComparisonQuestion
            key={q.name}
            register={register}
            name={q.name}
            leftMedia={q.leftMedia}
            rightMedia={q.rightMedia}
            onTouch={handleTouch}
          />
        </div>
      ))}

      <div className="fixed bottom-10 right-10 flex gap-4">
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
          className={`rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 ${
            !allTouched ? 'opacity-50' : ''
          }`}
          disabled={!allTouched}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default Page1;
