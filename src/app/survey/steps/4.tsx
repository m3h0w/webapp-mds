import { useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
} from 'react-hook-form';

interface Page4Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onBack: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

const Page4 = ({
  register,
  errors,
  trigger,
  onBack,
  getValues,
}: Page4Props) => {
  const [done, setDone] = useState(false);

  const downloadResults = () => {
    const results = getValues();

    const results_with_date = {
      ...results,
      date: new Date().toISOString(),
    };

    const experiment_id = results.experiment_id;

    // Download as JSON
    const jsonData = JSON.stringify(results_with_date, null, 2);
    const jsonBlob = new Blob([jsonData], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `survey_results_${experiment_id}.json`;
    jsonLink.click();
    URL.revokeObjectURL(jsonUrl);

    // Download as CSV
    // const csvRows = Object.entries(results_with_date).map(
    //   ([key, value]) => `${key},${value}`
    // );
    // const csvContent = ['field,value', ...csvRows].join('\n');
    // const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    // const csvUrl = URL.createObjectURL(csvBlob);
    // const csvLink = document.createElement('a');
    // csvLink.href = csvUrl;
    // csvLink.download = `survey_results_${experiment_id}.csv`;
    // csvLink.click();
    // URL.revokeObjectURL(csvUrl);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger validation for all fields on this page
    const isValid = await trigger([
      'psychedelic_use',
      'vr_use',
      'eye_dominance',
      'experiment_id',
    ]);
    if (!isValid) {
      // Prevent form submission if validation fails
      event.preventDefault();
    }
  };

  if (done) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <p className="text-2xl font-bold">Serdecznie dziękujemy za udział!</p>
        <button
          onClick={downloadResults}
          className="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
        >
          Pobierz wyniki jeszcze raz
        </button>
        {/* restart survey */}
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          onClick={() => {
            // refresh the page
            window.location.reload();
          }}
        >
          Restartuj ankietę
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-8">
        <p className="pt-10 italic text-gray-700">
          Twoje odpowiedzi są anonimowe i będą użyte wyłącznie na potrzeby
          badań.
        </p>

        <div>
          <label htmlFor="psychedelic_use" className="mb-2 block font-medium">
            Czy kiedykolwiek używałaś/-eś klasycznych substancji
            psychodelicznych (takich jak grzyby psylocybinowe lub LSD) w dawkach
            wywołujących halucynacje wzrokowe (np. poruszanie się statycznych
            powierzchni, zniekształcenia obiektów czy widzenie wzorców
            geometrycznych)?
          </label>
          <div className="space-y-2">
            {[
              { display: 'Nigdy', value: 'never' },
              { display: '1 raz', value: 'once' },
              { display: '2-4 razy', value: '2-4_times' },
              { display: '4-10 razy', value: '4-10_times' },
              { display: 'więcej niż 10 razy', value: 'more_than_10' },
              { display: 'Wolę nie odpowiadać', value: 'prefer_not_to_say' },
            ].map((option) => (
              <label key={option.display} className="flex items-center">
                <input
                  type="radio"
                  {...register('psychedelic_use', {
                    required: 'To pole jest wymagane',
                  })}
                  value={option.value}
                  className="mr-2"
                />
                {option.display}
              </label>
            ))}
          </div>
          {errors.psychedelic_use && (
            <p className="mt-1 text-sm text-red-500">
              {errors.psychedelic_use.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="vr_use" className="mb-2 block font-medium">
            Czy kiedykolwiek używałeś gogli do wirtualnej rzeczywistości (do
            gier lub oglądania treści)?
          </label>
          <div className="space-y-2">
            {[
              { display: 'Nigdy', value: 'never' },
              { display: 'Raz', value: 'once' },
              { display: 'Kilka razy', value: 'few_times' },
              { display: 'Wiele razy', value: 'many_times' },
              { display: 'Regularnie używam', value: 'regular_use' },
              { display: 'Wolę nie odpowiadać', value: 'prefer_not_to_say' },
            ].map((option) => (
              <label key={option.display} className="flex items-center">
                <input
                  type="radio"
                  {...register('vr_use', {
                    required: 'To pole jest wymagane',
                  })}
                  value={option.value}
                  className="mr-2"
                />
                {option.display}
              </label>
            ))}
          </div>
          {errors.vr_use && (
            <p className="mt-1 text-sm text-red-500">
              {errors.vr_use.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="eye_dominance" className="mb-2 block font-medium">
            Poproś osobę prowadzącą badanie o przeprowadzenie krótkiego testu na
            dominację oczną.
          </label>
          <div className="flex gap-4">
            {[
              { display: 'Lewe oko', value: 'left_eye' },
              { display: 'Prawe oko', value: 'right_eye' },
            ].map((option) => (
              <label key={option.display} className="flex items-center">
                <input
                  type="radio"
                  {...register('eye_dominance', {
                    required: 'To pole jest wymagane',
                  })}
                  value={option.value}
                  className="mr-2"
                />
                {option.display}
              </label>
            ))}
          </div>
          {errors.eye_dominance && (
            <p className="mt-1 text-sm text-red-500">
              {errors.eye_dominance.message as string}
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
              'psychedelic_use',
              'vr_use',
              'eye_dominance',
              'experiment_id',
              'high_vs_mid',
              'high_vs_low',
              'mid_vs_low',
              'high_strong_psychodelic',
              'high_weak_psychodelic',
              'mid_strong_psychodelic',
              'mid_weak_psychodelic',
              'low_strong_psychodelic',
              'low_weak_psychodelic',
              'high_strong_visual_pleasure',
              'high_weak_visual_pleasure',
              'mid_strong_visual_pleasure',
              'mid_weak_visual_pleasure',
              'low_strong_visual_pleasure',
              'low_weak_visual_pleasure',
            ]);
            if (isValid) {
              setDone(true);
              downloadResults();
            }
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Zakończ ankietę i pobierz wyniki
        </button>
      </div>
    </>
  );
};

export default Page4;
