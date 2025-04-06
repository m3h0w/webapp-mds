import { env } from 'process';
import { useEffect, useState, useMemo } from 'react';
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
  format: string;
  setFormat: (format: string) => void;
}

const assetsToPreload = [
  'https://storage.googleapis.com/dd-vr-gifs/gifs2/High_strong.gif',
  'https://storage.googleapis.com/dd-vr-gifs/gifs2/High_weak.gif',
  'https://storage.googleapis.com/dd-vr-gifs/gifs2/Mid_strong.gif',
  'https://storage.googleapis.com/dd-vr-gifs/gifs2/Mid_weak.gif',
  'https://storage.googleapis.com/dd-vr-gifs/gifs2/Low_strong.gif',
  'https://storage.googleapis.com/dd-vr-gifs/gifs2/Low_weak.gif',
];

const Page0 = ({
  register,
  errors,
  trigger,
  onNext,
  getValues,
  format,
  setFormat,
}: Page0Props) => {
  const [loadedCount, setLoadedCount] = useState(0);

  const formattedAssets = useMemo(() => {
    let assets = assetsToPreload.map((asset) =>
      asset.replace('.gif', `.${format}`)
    );

    if (process.env.NODE_ENV === 'development') {
      assets = assets.map((asset) =>
        asset.replace(
          'https://storage.googleapis.com/dd-vr-gifs/gifs2/',
          `/dd/`
        )
      );
    }
    return assets;
  }, [format]);

  const totalAssets = formattedAssets.length;

  useEffect(() => {
    setLoadedCount(0); // Reset counter when format changes

    formattedAssets.forEach((asset) => {
      if (format === 'mp4') {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.onloadeddata = () => {
          setLoadedCount((prev) => prev + 1);
        };
        video.onerror = (e) => {
          console.error('Error loading video:', asset, e);
        };
        console.log('preloading', asset);
        video.src = asset;
      } else {
        const img = new Image();
        img.onload = () => {
          setLoadedCount((prev) => prev + 1);
        };
        console.log('preloading', asset);
        img.src = asset;
      }
    });
  }, [format, formattedAssets]);

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

        <div className="mt-4">
          <label htmlFor="format" className="mb-2 block font-medium">
            Format plików (wybiera prowadzący):
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="mp4">MP4</option>
            <option value="gif">GIF</option>
            <option value="webp">WebP</option>
          </select>
        </div>
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
