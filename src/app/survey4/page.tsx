'use client';

import React, { useState, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Page1 from './steps/1';
import Page2 from './steps/2';
import Page3 from './steps/3';
import Page4 from './steps/4';
import Page0 from './steps/0';

const QUESTIONS_2 = [
  // High strong
  {
    name: 'high_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs2/High_strong.gif'],
    group: 'strong',
    level: 'high',
  },
  // Mid strong (style transfer 2)
  {
    name: 'mid_strong_psychodelic',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs2/Mid_strong.gif'],
    group: 'strong',
    level: 'mid',
  },
];

const QUESTIONS_3 = [
  // High strong
  {
    name: 'high_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs2/High_strong.gif'],
    group: 'strong',
    level: 'high',
  },
  // Mid strong (style transfer 2)
  {
    name: 'mid_strong_visual_pleasure',
    media: ['https://storage.googleapis.com/dd-vr-gifs/gifs2/Mid_strong.gif'],
    group: 'strong',
    level: 'mid',
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

      // Assign sequential numbers starting at 1
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
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto py-2">
      <div className="mx-auto bg-white">
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
              onBack={() => {
                setCurrentPage(0);
                scrollToTop();
              }}
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
