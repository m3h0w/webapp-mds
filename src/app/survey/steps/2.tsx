import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { useMemo, useState } from 'react';
import Image from 'next/image';

import SingleMediaQuestion from '../components/SingleMediaQuestion';
import { index } from 'd3';

interface Page2Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onBack: () => void;
  onNext: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

const PYTANIE =
  'Dla poniższych efektów zniekształcenia obrazu oceń na ile w Twojej ocenie przypominać mogą wizualne efekty zażycia substancji psychodelicznych takich jak LSD czy grzyby psylocybinowe?';

const QUESTIONS = [
  {
    name: 'high_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_strong.gif'],
  },
  {
    name: 'high_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_weak.gif'],
  },
  {
    name: 'mid_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif'],
  },
  {
    name: 'mid_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_weak.gif'],
  },
  {
    name: 'low_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif'],
  },
  {
    name: 'low_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_weak.gif'],
  },
];

const QUESTIONS_SHUFFLED = QUESTIONS.sort(() => Math.random() - 0.5);

const Page2 = ({
  register,
  errors,
  trigger,
  onBack,
  onNext,
  getValues,
}: Page2Props) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const handleTouch = (fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  };

  const questions = QUESTIONS_SHUFFLED;

  const handleNext = async () => {
    const fields = [
      'high_strong_psychodelic',
      'high_weak_psychodelic',
      'mid_strong_psychodelic',
      'mid_weak_psychodelic',
      'low_strong_psychodelic',
      'low_weak_psychodelic',
    ];

    const formValues = await trigger(fields);

    // Get the current values
    const values = fields.map((field) => getValues(field));

    const allFieldsTouched = fields.every((field) => touchedFields.has(field));

    // Check if any values are undefined
    const hasUndefinedValues = values.some((value) => value === undefined);

    if (formValues && !hasUndefinedValues && allFieldsTouched) {
      onNext();
    } else {
      alert('Proszę odpowiedzieć na wszystkie pytania przed przejściem dalej.');
    }
  };

  const allTouched = useMemo(() => {
    return questions.every((q) => touchedFields.has(q.name));
  }, [touchedFields, questions]);

  return (
    <div className="flex h-[98vh]">
      {/* Left side - GIFs (2/3 width) */}
      <div className="grid w-6/12 grid-cols-2 gap-4 overflow-y-auto p-2 pl-10">
        {questions.map((q, index) => (
          <div key={q.name} className="relative aspect-video h-[30vh] w-[40vh]">
            <div className="absolute left-2 top-2 z-10 flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
              <span className="text-lg font-bold text-black">{index + 1}</span>
            </div>
            <Image
              src={q.media[0]} // Using first media item as GIF
              alt={q.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      {/* Right side - Sliders (1/3 width) */}
      <div className=" w-6/12 space-y-10 overflow-y-auto p-8 pr-14 pt-2">
        <h3 className="text-lg font-medium">{PYTANIE}</h3>
        <div
          style={{
            marginTop: 20,
            paddingLeft: 40,
            paddingRight: 100,
          }}
          className="space-y-10"
        >
          {questions.map((q) => (
            <SingleMediaQuestion
              key={q.name}
              register={register}
              name={q.name}
              media={q.media}
              onTouch={handleTouch}
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
        </div>

        <div className="mt-14 flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            style={{
              opacity: 0,
            }}
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
    </div>
  );
};

export default Page2;
