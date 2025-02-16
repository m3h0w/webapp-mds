import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import { useMemo } from 'react';

import ComparisonQuestion from '../components/ComparisonQuestion';

interface Page1Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
}

const Page1 = ({ register, errors, trigger, onNext }: Page1Props) => {
  const questions = useMemo(() => {
    const media1 = [
      '/1-output.gif',
      '/2-output.gif',
      '/1-output.gif',
      '/2-output.gif',
      '/1-output.gif',
    ];
    const media2 = [
      '/3-output.gif',
      '/4-output.gif',
      '/3-output.gif',
      '/4-output.gif',
      '/3-output.gif',
    ];
    const media3 = [
      '/5-output.gif',
      '/6-output.gif',
      '/5-output.gif',
      '/6-output.gif',
      '/5-output.gif',
    ];
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
    <div className="grid grid-cols-1 gap-16 px-4 md:grid-cols-1">
      {questions.map((q) => (
        <div
          key={q.name}
          className="mx-auto"
          style={{ width: '92vw', height: '100vh' }}
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

      {/* <div>
          <label htmlFor="intensity" className="mb-2 block font-medium">
            How intense was your most recent psychedelic experience?*
          </label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="radio"
                  id={`intensity-${value}`}
                  {...register('intensity', {
                    required: 'This field is required',
                  })}
                  value={value}
                  className="mr-1"
                />
                {value}
              </label>
            ))}
          </div>
          {errors.intensity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.intensity.message as string}
            </p>
          )}
        </div> */}

      {/* <div>
          <label htmlFor="frequency" className="mb-2 block font-medium">
            How frequently do you engage in psychedelic experiences?*
          </label>
          <select
            id="frequency"
            {...register('frequency', {
              required: 'This field is required',
            })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select an option</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Every few months">Every few months</option>
            <option value="Yearly">Yearly</option>
            <option value="Rarely">Rarely</option>
          </select>
          {errors.frequency && (
            <p className="mt-1 text-sm text-red-500">
              {errors.frequency.message as string}
            </p>
          )}
        </div> */}

      {/* <div>
          <label htmlFor="insights" className="mb-2 block font-medium">
            Describe any notable insights from your experiences:
          </label>
          <textarea
            id="insights"
            {...register('insights')}
            rows={3}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div> */}

      <div className="flex justify-end">
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
