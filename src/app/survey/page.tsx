'use client';

import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Page1 from './steps/1';
import Page2 from './steps/2';
import Page3 from './steps/3';
import Page4 from './steps/4';
import Page0 from '@/app/survey/steps/0';

const SurveyPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log('Survey results:', data);

    // Create a Blob containing the JSON data
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a download link and trigger it
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `survey-results-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto bg-white">
        <div className="mb-8">
          {currentPage > 0 && (
            <h1 className="mb-4 w-full text-center text-2xl font-bold">
              Ankieta percepcji zniekształceń wizualnych{' '}
              {currentPage == 0 ? '' : `(Strona ${currentPage})`}
            </h1>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentPage === 0 ? (
            <Page0
              register={register}
              errors={errors}
              trigger={trigger}
              onNext={() => {
                setCurrentPage(1);
                scrollToTop();
              }}
            />
          ) : currentPage === 1 ? (
            <Page1
              register={register}
              errors={errors}
              trigger={trigger}
              onNext={() => {
                setCurrentPage(2);
                scrollToTop();
              }}
            />
          ) : currentPage === 2 ? (
            <Page2
              register={register}
              errors={errors}
              trigger={trigger}
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
