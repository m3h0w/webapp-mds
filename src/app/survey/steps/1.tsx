import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

import ComparisonQuestion from '../components/ComparisonQuestion';

interface Page1Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
}

const Page1 = ({ register, errors, trigger, onNext }: Page1Props) => {
  const handleNext = async () => {
    // Trigger validation for all fields on this page
    const isValid = await trigger([
      'visualComparison',
      'intensity',
      'frequency',
    ]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <>
      <div className="space-y-8">
        <ComparisonQuestion
          register={register}
          name="visualComparison"
          leftMedia="/1.webp"
          rightMedia="/2.webp"
          question="How different are these two visual patterns?"
        />

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Page1;
