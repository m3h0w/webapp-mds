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
    number: 1,
  },
  {
    name: 'mid_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif'],
    number: 3,
  },
  {
    name: 'low_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif'],
    number: 5,
  },
  {
    name: 'high_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_weak.gif'],
    number: 2,
  },
  {
    name: 'mid_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_weak.gif'],
    number: 4,
  },
  {
    name: 'low_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_weak.gif'],
    number: 6,
  },
];

// const QUESTIONS_SHUFFLED = QUESTIONS.sort(() => Math.random() - 0.5);
const QUESTIONS_SHUFFLED = QUESTIONS;

const getOrderedIndex = (index: number) => {
  // Convert grid position to ordered number (1-6)
  const orderMap = [0, 3, 1, 4, 2, 5]; // Maps grid position to desired order
  return orderMap.indexOf(index) + 1;
};

const Page2 = ({
  register,
  errors,
  trigger,
  onBack,
  onNext,
  getValues,
}: Page2Props) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const [imagesVisible, setImagesVisible] = useState(true);

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

  const handleRefresh = () => {
    setImagesVisible(false);
    setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
      setImagesVisible(true);
    }, 1000);
  };

  return (
    <div className="flex h-[98vh]" key={refreshKey}>
      {/* Left side - GIFs (2/3 width) */}
      <div className="relative w-7/12">
        <button
          type="button"
          onClick={handleRefresh}
          className="absolute bottom-4 left-20 z-10 rounded-md bg-gray-500 px-3 py-1 text-white transition-colors hover:bg-gray-600"
        >
          Odśwież
        </button>
        <div className="grid grid-cols-3 gap-4 overflow-y-auto p-2 pl-10">
          {questions.map((q, index) => (
            <div
              key={q.name + index + refreshKey}
              className="relative aspect-video h-[45vh] w-[33vh]"
            >
              <div className="absolute left-2 top-2 z-10 flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
                <span className="text-lg font-bold text-black">{q.number}</span>
              </div>
              {imagesVisible && (
                <Image
                  src={q.media[0]}
                  alt={q.name}
                  fill
                  className="rounded-lg object-cover"
                  priority={index < 3}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  unoptimized={true}
                  key={q.name + index + refreshKey + 'image'}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Sliders (1/3 width) */}
      <div className=" w-5/12 space-y-10 overflow-y-auto p-8 pr-14 pt-2">
        <h3 className="text-lg font-medium">{PYTANIE}</h3>
        <div
          style={{
            marginTop: 20,
            paddingLeft: 40,
            paddingRight: 100,
          }}
          className="space-y-10"
        >
          {[...questions]
            .sort((a, b) => a.number - b.number)
            .map((q, index) => (
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
                        {q.number}
                      </span>
                    </div>
                    <span className="text-lg font-medium">| Efekt</span>
                    <span className="text-lg font-medium">{q.number}</span>
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
