import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Page3Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onBack: () => void;
}

const Page3 = ({ register, errors, onBack }: Page3Props) => {
  return (
    <>
      <div className="space-y-8">
        <p className="italic text-gray-700">
          Twoje odpowiedzi są anonimowe i będą użyte wyłącznie potrzeby badań.
        </p>

        <div>
          <label htmlFor="psychedelicUse" className="mb-2 block font-medium">
            Czy kiedykolwiek używałeś/aś klasycznych substancji psychodelicznych
            (takich jak grzyby psylocybinowe lub LSD) w dawkach wywołujących
            halucynacje wzrokowe?*
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
              '1 raz',
              '2-4 razy',
              '4-10 razy',
              'więcej niż 10 razy',
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
            Dominacja oczna:*
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

        <div>
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
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Wstecz
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Zakończ ankietę
        </button>
      </div>
    </>
  );
};

export default Page3;
