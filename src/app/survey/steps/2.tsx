import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Page2Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onBack: () => void;
  onNext: () => void;
}

const Page2 = ({ register, errors, onBack, onNext }: Page2Props) => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <label htmlFor="recommend" className="mb-2 block font-medium">
            Would you recommend psychedelic experiences to others?*
          </label>
          <select
            id="recommend"
            {...register('recommend', {
              required: 'This field is required',
            })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Select an option</option>
            <option value="Yes, with proper guidance">
              Yes, with proper guidance
            </option>
            <option value="Maybe, depends on the person">
              Maybe, depends on the person
            </option>
            <option value="Neutral">Neutral</option>
            <option value="Probably not">Probably not</option>
            <option value="Definitely not">Definitely not</option>
          </select>
          {errors.recommend && (
            <p className="mt-1 text-sm text-red-500">
              {errors.recommend.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="aspects" className="mb-2 block font-medium">
            Which aspects of the experience did you find most valuable?*
          </label>
          <div className="space-y-2">
            {[
              'Personal insights',
              'Visual experiences',
              'Emotional healing',
              'Spiritual connection',
              'Creative inspiration',
            ].map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  id={`aspects-${feature}`}
                  {...register('aspects', {
                    required: 'Please select at least one aspect',
                  })}
                  value={feature}
                  className="mr-2"
                />
                {feature}
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('aspects')}
                value="Other"
                className="mr-2"
              />
              Other
            </label>
          </div>
          {errors.aspects && (
            <p className="mt-1 text-sm text-red-500">
              {errors.aspects.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Dalej
        </button>
      </div>
    </>
  );
};

export default Page2;
