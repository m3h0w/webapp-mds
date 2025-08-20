'use client';

import React, { useState, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

// import Page1 from './steps/1';
import Page2 from './steps/2';
import Page3 from './steps/3';
import Page4 from './steps/4';
import Page0 from './steps/0';

const QUESTIONS_2 = [
  // Strong group (top)
  {
    name: 'high_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs2/High_strong.gif'],
    // number: 1,
    group: 'strong',
    level: 'high',
  },
];

const QUESTIONS_3 = [
  // Strong group (top)
  {
    name: 'high_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs2/High_strong.gif'],
    group: 'strong',
    level: 'high',
  },
];

const SurveyPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [format, setFormat] = useState('mp4');
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();

  // Create shared randomization
  const { randomizedQuestions2, randomizedQuestions3 } = useMemo(() => {
    const createNumberedQuestions = (questions: typeof QUESTIONS_2) => {
      // For survey3 we only have the high/strong item; no grouping needed
      const qs = [...questions];

      // replace urls with local urls if localhost and update format
      if (
        process.env.NODE_ENV === 'development' &&
        process.env.NEXT_PUBLIC_USE_BUCKET !== 'true'
      ) {
        qs.forEach((q) => {
          q.media = q.media.map((m) =>
            m
              .replace(
                'https://storage.googleapis.com/dd-vr-gifs/gifs2/',
                `/dd/`
              )
              .replace(/\.(gif|mp4|webp)$/, `.${format}`)
          );
        });
      } else {
        qs.forEach((q) => {
          q.media = q.media.map((m) =>
            m.replace(/\.(gif|mp4|webp)$/, `.${format}`)
          );
        });
      }

      // Assign simple sequential numbers starting at 1
      return qs.map((q, index) => ({
        ...q,
        number: index + 1,
      }));
    };

    return {
      randomizedQuestions2: createNumberedQuestions(QUESTIONS_2),
      randomizedQuestions3: createNumberedQuestions(QUESTIONS_3),
    };
  }, [format]);

  const onSubmit = (data: FieldValues) => {
    void data; // parameter intentionally unused
    // console.log('Survey results:', data);
    // // Create a Blob containing the JSON data
    // const jsonString = JSON.stringify(data, null, 2);
    // const blob = new Blob([jsonString], { type: 'application/json' });
    // // Create a download link and trigger it
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = `survey-results-${new Date().toISOString()}.json`;
    // document.body.appendChild(link);
    // link.click();
    // // Cleanup
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto py-2">
      <div className="mx-auto bg-white">
        {/* <div className="mb-8">
          {currentPage > 0 && (
            <h1 className="mb-4 w-full text-center text-2xl font-bold">
              Ankieta percepcji zniekształceń wizualnych{' '}
              {currentPage == 0 ? '' : `(Strona ${currentPage})`}
            </h1>
          )}
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentPage === 0 ? (
            <Page0
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              onNext={() => {
                setCurrentPage(1);
                scrollToTop();
              }}
              format={format}
              setFormat={setFormat}
            />
          ) : currentPage === 1 ? (
            <Page2
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              questions={randomizedQuestions2}
              onBack={() => {
                setCurrentPage(0);
                scrollToTop();
              }}
              onNext={() => {
                setCurrentPage(2);
                scrollToTop();
              }}
            />
          ) : currentPage === 2 ? (
            <Page3
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              questions={randomizedQuestions3}
              onBack={() => {
                setCurrentPage(1);
                scrollToTop();
              }}
              onNext={() => {
                setCurrentPage(3);
                scrollToTop();
              }}
            />
          ) : (
            <Page4
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              onBack={() => {
                setCurrentPage(2);
                scrollToTop();
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
