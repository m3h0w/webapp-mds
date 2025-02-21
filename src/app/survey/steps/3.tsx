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

interface Page3Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onBack: () => void;
  onNext: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

const PYTANIE =
  'Dla poniższych efektów zniekształcenia obrazu oceń na ile podobały Ci się one wizualnie, tak że miałaś/miałeś przyjemność z ich oglądania? ';

const QUESTIONS = [
  // Strong group (top)
  {
    name: 'high_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_strong.gif'],
    group: 'strong',
    level: 'high',
  },
  {
    name: 'mid_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif'],
    group: 'strong',
    level: 'mid',
  },
  {
    name: 'low_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif'],
    group: 'strong',
    level: 'low',
  },
  // Weak group (bottom)
  {
    name: 'high_weak_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_weak.gif'],
    group: 'weak',
    level: 'high',
  },
  {
    name: 'mid_weak_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_weak.gif'],
    group: 'weak',
    level: 'mid',
  },
  {
    name: 'low_weak_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_weak.gif'],
    group: 'weak',
    level: 'low',
  },
];

const Page3 = ({
  register,
  errors,
  trigger,
  onBack,
  onNext,
  getValues,
}: Page3Props) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const [imagesVisible, setImagesVisible] = useState(true);

  const handleTouch = (fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  };

  const handleRefresh = () => {
    setImagesVisible(false);
    setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
      setImagesVisible(true);
    }, 1000);
  };

  const questions = useMemo(() => {
    const levels = ['high', 'mid', 'low'].sort(() => Math.random() - 0.5);
    const groups = ['strong', 'weak'].sort(() => Math.random() - 0.5);

    const shuffledQuestions = [
      // First group (first 3)
      ...levels.map(
        (level) =>
          QUESTIONS.find((q) => q.group === groups[0] && q.level === level)!
      ),
      // Second group (last 3)
      ...levels.map(
        (level) =>
          QUESTIONS.find((q) => q.group === groups[1] && q.level === level)!
      ),
    ];

    return shuffledQuestions.map((q, index) => ({
      ...q,
      number: index < 3 ? index * 2 + 1 : (index - 3) * 2 + 2,
    }));
  }, []);

  const handleNext = async () => {
    const fields = [
      'high_strong_visual_pleasure',
      'high_weak_visual_pleasure',
      'mid_strong_visual_pleasure',
      'mid_weak_visual_pleasure',
      'low_strong_visual_pleasure',
      'low_weak_visual_pleasure',
    ];

    const formValues = await trigger(fields);

    // Get the current values
    const values = fields.map((field) => getValues(field));

    // Check if any values are undefined
    const hasUndefinedValues = values.some((value) => value === undefined);

    const allFieldsTouched = fields.every((field) => touchedFields.has(field));

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
              key={'3' + q.name + index + refreshKey}
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
                  key={'3' + q.name + index + refreshKey + 'image'}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Sliders (1/3 width) */}
      <div className="w-5/12 space-y-8 overflow-y-auto p-8 pr-14 pt-2">
        <h3 className="mb-6 text-lg font-medium">{PYTANIE}</h3>

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
            .map((q) => (
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

        <div className="fixed bottom-10 right-10 mt-8 flex justify-between pt-8">
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

export default Page3;
