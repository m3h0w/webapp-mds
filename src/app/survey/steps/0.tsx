import { useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

interface Page0Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
}

const Page0 = ({ register, errors, trigger, onNext }: Page0Props) => {
  const handleNext = async () => {
    const isValid = await trigger('experimentId');
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          Badanie percepcji zniekształceń wizualnych
        </h1>
        <p className="text-gray-600">
          Witamy w badaniu dotyczącym percepcji zniekształceń wizualnych.
          Ankieta składa się z kilku części i zajmie około 10-15 minut. Twoje
          odpowiedzi są anonimowe i zostaną wykorzystane wyłącznie w celach
          naukowych.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <label htmlFor="experimentId" className="mb-2 block font-medium">
          ID eksperymentu (wypełnia prowadzący):*
        </label>
        <input
          type="text"
          {...register('experimentId', {
            required: 'To pole jest wymagane',
            pattern: {
              value: /^[0-9]{2}$/,
              message: 'ID musi być w formacie 01-99',
            },
          })}
          className="w-20 rounded-md border border-gray-300 p-2"
          placeholder="01-99"
        />
        {errors.experimentId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.experimentId.message as string}
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
          // disabled={!isValid}
        >
          Rozpocznij ankietę
        </button>
      </div>
    </div>
  );
};

export default Page0;
