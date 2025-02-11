'use client';

import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Page1 from './steps/1';
import Page2 from './steps/2';
import Page3 from './steps/3';

const SurveyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-[800px] bg-white">
        <div className="mb-8">
          <h1 className="mb-4 text-2xl font-bold">
            Psychedelic Experience Survey
          </h1>
          <p className="mb-8 text-gray-700">
            Please help us improve our psychedelic experiences by taking this
            quick survey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentPage === 1 ? (
            <Page1
              register={register}
              errors={errors}
              trigger={trigger}
              onNext={() => setCurrentPage(2)}
            />
          ) : currentPage === 2 ? (
            <Page2
              register={register}
              errors={errors}
              trigger={trigger}
              onBack={() => setCurrentPage(1)}
              onNext={() => setCurrentPage(3)}
            />
          ) : (
            <Page3
              register={register}
              errors={errors}
              trigger={trigger}
              onBack={() => setCurrentPage(2)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
