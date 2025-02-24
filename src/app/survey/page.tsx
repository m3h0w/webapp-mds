'use client';

import React, { useState, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Page1 from './steps/1';
import Page2 from './steps/2';
import Page3 from './steps/3';
import Page4 from './steps/4';
import Page0 from '@/app/survey/steps/0';

const QUESTIONS_2 = [
  // Strong group (top)
  {
    name: 'high_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_strong.gif'],
    // number: 1,
    group: 'strong',
    level: 'high',
  },
  {
    name: 'mid_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif'],
    // number: 2,
    group: 'strong',
    level: 'mid',
  },
  {
    name: 'low_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif'],
    // number: 3,
    group: 'strong',
    level: 'low',
  },
  // Weak group (bottom)
  {
    name: 'high_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_weak.gif'],
    // number: 4,
    group: 'weak',
    level: 'high',
  },
  {
    name: 'mid_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_weak.gif'],
    // number: 5,
    group: 'weak',
    level: 'mid',
  },
  {
    name: 'low_weak_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_weak.gif'],
    // number: 6,
    group: 'weak',
    level: 'low',
  },
];

const QUESTIONS_3 = [
  // Strong group (top)
  {
    name: 'high_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_strong.gif'],
    group: 'strong',
    level: 'high',
  },
  {
    name: 'mid_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_strong.gif'],
    group: 'strong',
    level: 'mid',
  },
  {
    name: 'low_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_strong.gif'],
    group: 'strong',
    level: 'low',
  },
  // Weak group (bottom)
  {
    name: 'high_weak_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/High_weak.gif'],
    group: 'weak',
    level: 'high',
  },
  {
    name: 'mid_weak_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Mid_weak.gif'],
    group: 'weak',
    level: 'mid',
  },
  {
    name: 'low_weak_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs/Low_weak.gif'],
    group: 'weak',
    level: 'low',
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
    const levels = ['high', 'mid', 'low'].sort(() => Math.random() - 0.5);
    const groups = ['strong', 'weak'].sort(() => Math.random() - 0.5);

    const createNumberedQuestions = (questions: typeof QUESTIONS_2) => {
      const shuffledQuestions = [
        // First group (first 3)
        ...levels.map(
          (level) =>
            questions.find((q) => q.group === groups[0] && q.level === level)!
        ),
        // Second group (last 3)
        ...levels.map(
          (level) =>
            questions.find((q) => q.group === groups[1] && q.level === level)!
        ),
      ];

      // replace urls with local urls if localhost and update format
      if (process.env.NODE_ENV === 'development') {
        shuffledQuestions.forEach((q) => {
          q.media = q.media.map((m) =>
            m
              .replace(
                'https://storage.googleapis.com/dd-vr-gifs/gifs/',
                `/dd/`
              )
              .replace(/\.(gif|mp4|webp)$/, `.${format}`)
          );
        });
      } else {
        shuffledQuestions.forEach((q) => {
          q.media = q.media.map((m) =>
            m.replace(/\.(gif|mp4|webp)$/, `.${format}`)
          );
        });
      }

      return shuffledQuestions.map((q, index) => ({
        ...q,
        number: index < 3 ? index * 2 + 1 : (index - 3) * 2 + 2,
      }));
    };

    return {
      randomizedQuestions2: createNumberedQuestions(QUESTIONS_2),
      randomizedQuestions3: createNumberedQuestions(QUESTIONS_3),
    };
  }, [format]);

  const onSubmit = (data: FieldValues) => {
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
            <Page1
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              onNext={() => {
                setCurrentPage(2);
                scrollToTop();
              }}
              format={format}
            />
          ) : currentPage === 2 ? (
            <Page2
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              questions={randomizedQuestions2}
              onBack={() => {
                setCurrentPage(1);
                scrollToTop();
              }}
              onNext={() => {
                setCurrentPage(3);
                scrollToTop();
              }}
            />
          ) : currentPage === 3 ? (
            <Page3
              register={register}
              errors={errors}
              trigger={trigger}
              getValues={getValues}
              questions={randomizedQuestions3}
              onBack={() => {
                setCurrentPage(2);
                scrollToTop();
              }}
              onNext={() => {
                setCurrentPage(4);
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
                setCurrentPage(3);
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
