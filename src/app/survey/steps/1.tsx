import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
} from 'react-hook-form';
import { useMemo } from 'react';

import ComparisonQuestion from '../components/ComparisonQuestion';
import { index } from 'd3';

interface Page1Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  onNext: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

const Page1 = ({
  register,
  errors,
  trigger,
  onNext,
  getValues,
}: Page1Props) => {
  const questions = useMemo(() => {
    const media1 = [
      'https://storage.googleapis.com/dd-vr-gifs/gifs/High_strong.gif',
    ];
    const media2 = [
      'https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif',
    ];
    const media3 = [
      'https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif',
    ];
    const questionData = [
      {
        name: 'high_vs_mid',
        mediaA: media1,
        mediaB: media2,
      },
      {
        name: 'high_vs_low',
        mediaA: media3,
        mediaB: media1,
      },
      {
        name: 'mid_vs_low',
        mediaA: media3,
        mediaB: media2,
      },
    ];

    // randomiez order
    questionData.sort(() => Math.random() - 0.5);

    // return randomizedQuestions.map(({ name, mediaA, mediaB }) => ({
    //   name,
    //   leftMedia: Math.random() < 0.5 ? mediaA : mediaB,
    //   rightMedia: Math.random() < 0.5 ? mediaB : mediaA,
    // }));

    return questionData.map(({ name, mediaA, mediaB }) => {
      const randomize = Math.random() < 0.5;
      return {
        name,
        leftMedia: randomize ? mediaA : mediaB,
        rightMedia: randomize ? mediaB : mediaA,
      };
    });
  }, []);

  const handleNext = async () => {
    const formValues = await trigger([
      'high_vs_mid',
      'high_vs_low',
      'mid_vs_low',
    ]);

    // Get the current values using getValues as an object
    const currentValues = {
      high_vs_mid: getValues('high_vs_mid'),
      high_vs_low: getValues('high_vs_low'),
      mid_vs_low: getValues('mid_vs_low'),
    };

    // Check if any values are undefined
    const hasUndefinedValues = Object.values(currentValues).some(
      (value) => value === -1
    );

    if (formValues && !hasUndefinedValues) {
      onNext();
    } else {
      alert('Proszę odpowiedzieć na wszystkie pytania przed przejściem dalej.');
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-10 p-4 md:grid-cols-2">
      <h3
        style={{
          height: 2,
        }}
        className="col-span-full mb-0 text-center text-lg font-medium"
      >
        Na ile przedstawione efekty zniekształceń obrazu różnią się od siebie
        wizualnie w Twojej ocenie?
      </h3>

      {questions.map((q, index) => (
        <div
          key={q.name}
          className={`mx-auto h-[calc(35vh)] ${
            index === 2 ? 'md:col-start-1 md:col-end-2' : ''
          }`}
          style={{
            width: '90%',
            transform: `${index === 2 ? 'translateX(60%)' : ''}`,
          }}
        >
          <ComparisonQuestion
            key={q.name}
            register={register}
            name={q.name}
            leftMedia={q.leftMedia}
            rightMedia={q.rightMedia}
          />
        </div>
      ))}

      <div className="absolute bottom-10 right-10">
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
