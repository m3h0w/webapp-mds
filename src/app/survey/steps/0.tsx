import { useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

interface Page0Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

const Page0 = ({
  register,
  errors,
  trigger,
  onNext,
  getValues,
}: Page0Props) => {
  let assetsToPreload = [
    'https://storage.googleapis.com/dd-vr-gifs/gifs/High_strong.gif',
    'https://storage.googleapis.com/dd-vr-gifs/gifs/High_weak.gif',
    'https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif',
    'https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_weak.gif',
    'https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif',
    'https://storage.googleapis.com/dd-vr-gifs/gifs/Low_weak.gif',
  ];

  if (process.env.NODE_ENV === 'development') {
    assetsToPreload = assetsToPreload.map((asset) =>
      asset.replace(
        'https://storage.googleapis.com/dd-vr-gifs/gifs/',
        'http://localhost:3000/dd/'
      )
    );
  }

  const [loadedCount, setLoadedCount] = useState(0);
  const totalAssets = assetsToPreload.length;

  useEffect(() => {
    assetsToPreload.forEach((asset) => {
      const img = new Image();
      img.onload = () => {
        setLoadedCount((prev) => prev + 1);
      };
      img.src = asset;
    });
  }, []);

  const handleNext = async () => {
    const isValid = await trigger('experiment_id');
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        {/* spacer y */}
        <div className="h-24" />
        <h1 className="text-3xl font-bold">
          Badanie percepcji zniekształceń wizualnych
        </h1>
        {loadedCount < totalAssets && (
          <div className="text-gray-600">
            Ładowanie zasobów: {loadedCount}/{totalAssets}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <label htmlFor="experiment_id" className="mb-2 block font-medium">
          ID eksperymentu (wypełnia prowadzący):
        </label>
        <input
          type="text"
          {...register('experiment_id', {
            required: 'To pole jest wymagane',
            pattern: {
              value: /^[0-9]{2}$/,
              message: 'ID musi być w formacie 01-99',
            },
          })}
          className="w-20 rounded-md border border-gray-300 p-2"
          placeholder="01-99"
        />
        {errors.experiment_id && (
          <p className="mt-1 text-sm text-red-500">
            {errors.experiment_id.message as string}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
          disabled={loadedCount < totalAssets}
        >
          {loadedCount < totalAssets ? 'Ładowanie...' : 'Rozpocznij ankietę'}
        </button>
      </div>
    </div>
  );
};

export default Page0;
