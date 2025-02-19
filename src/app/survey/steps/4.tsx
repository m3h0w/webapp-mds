import { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

interface Page4Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onBack: () => void;
}

const Page4 = ({ register, errors, trigger, onBack }: Page4Props) => {
  const [done, setDone] = useState(false);
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger validation for all fields on this page
    const isValid = await trigger([
      'psychedelicUse',
      'vrUse',
      'eyeDominance',
      'experimentId',
    ]);
    if (!isValid) {
      // Prevent form submission if validation fails
      event.preventDefault();
    }
  };

  if (done) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-2xl font-bold">Serdecznie dziękujemy za udział!</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-8">
        <p className="italic text-gray-700">
          Twoje odpowiedzi są anonimowe i będą użyte wyłącznie na potrzeby
          badań.
        </p>

        <div>
          <label htmlFor="psychedelicUse" className="mb-2 block font-medium">
            Czy kiedykolwiek używałaś/-eś klasycznych substancji
            psychodelicznych (takich jak grzyby psylocybinowe lub LSD) w dawkach
            wywołujących halucynacje wzrokowe (np. poruszanie się statycznych
            powierzchni, zniekształcenia obiektów czy widzenie wzorców
            geometrycznych)?*
          </label>
          <div className="space-y-2">
            {[
              'Nigdy',
              '1 raz',
              '2-4 razy',
              '4-10 razy',
              'więcej niż 10 razy',
              'Wolę nie odpowiadać',
            ].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  {...register('psychedelicUse', {
                    required: 'To pole jest wymagane',
                  })}
                  value={option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.psychedelicUse && (
            <p className="mt-1 text-sm text-red-500">
              {errors.psychedelicUse.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="vrUse" className="mb-2 block font-medium">
            Czy kiedykolwiek używałeś gogli do wirtualnej rzeczywistości (do
            gier lub oglądania treści)?*
          </label>
          <div className="space-y-2">
            {[
              'Nigdy',
              'Raz',
              'Kilka razy',
              'Wiele razy',
              'Regularnie używam',
              'Wolę nie odpowiadać',
            ].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  {...register('vrUse', {
                    required: 'To pole jest wymagane',
                  })}
                  value={option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.vrUse && (
            <p className="mt-1 text-sm text-red-500">
              {errors.vrUse.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="eyeDominance" className="mb-2 block font-medium">
            Poproś osobę prowadzącą badanie o przeprowadzenie krótkiego testu na
            dominację oczną.*
          </label>
          <div className="flex gap-4">
            {['Lewe oko', 'Prawe oko'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  {...register('eyeDominance', {
                    required: 'To pole jest wymagane',
                  })}
                  value={option}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.eyeDominance && (
            <p className="mt-1 text-sm text-red-500">
              {errors.eyeDominance.message as string}
            </p>
          )}
        </div>

        {/* <div>
          <label htmlFor="experimentId" className="mb-2 block font-medium">
            ID eksperymentu:*
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
        </div> */}
      </div>

      {/* <p className="mt-8 text-center">Serdecznie dziękujemy za udział!</p> */}

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Wstecz
        </button>
        <button
          type="submit"
          onClick={async (e: any) => {
            await handleSubmit(e);
            // check if valid
            const isValid = await trigger([
              'psychedelicUse',
              'vrUse',
              'eyeDominance',
              'experimentId',
            ]);
            if (isValid) {
              setDone(true);
            }
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Zakończ ankietę
        </button>
      </div>
    </>
  );
};

export default Page4;
