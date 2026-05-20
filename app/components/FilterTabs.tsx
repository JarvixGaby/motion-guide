'use client';
import { useState } from 'react';
import { PAGE_TYPES, USE_CASES, PageType, UseCase } from '@/data/taxonomies';

interface FilterTabsProps {
  onFilterChange: (pageType: PageType | null, useCase: UseCase | null) => void;
}

export function FilterTabs({ onFilterChange }: FilterTabsProps) {
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const handlePageTypeClick = (pageType: PageType | null) => {
    setSelectedPageType(pageType);
    onFilterChange(pageType, selectedUseCase);
  };

  const handleUseCaseClick = (useCase: UseCase | null) => {
    setSelectedUseCase(useCase);
    onFilterChange(selectedPageType, useCase);
  };

  return (
    <div className="space-y-8">
      {/* Page Types Filter */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500">Page Type</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePageTypeClick(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedPageType === null
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-orange-50 border border-stone-200'
            }`}
          >
            All Pages
          </button>
          {PAGE_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => handlePageTypeClick(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedPageType === type
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-orange-50 border border-stone-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Use Cases Filter */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500">Use Case</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleUseCaseClick(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedUseCase === null
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-orange-50 border border-stone-200'
            }`}
          >
            All Use Cases
          </button>
          {USE_CASES.map((useCase) => (
            <button
              key={useCase}
              onClick={() => handleUseCaseClick(useCase)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedUseCase === useCase
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-orange-50 border border-stone-200'
              }`}
            >
              {useCase}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedPageType || selectedUseCase) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200">
          <span className="text-sm font-medium text-stone-600">Active:</span>
          {selectedPageType && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {selectedPageType}
              <button
                onClick={() => handlePageTypeClick(null)}
                className="hover:text-orange-900"
                aria-label="Remove page type filter"
              >
                ×
              </button>
            </span>
          )}
          {selectedUseCase && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {selectedUseCase}
              <button
                onClick={() => handleUseCaseClick(null)}
                className="hover:text-orange-900"
                aria-label="Remove use case filter"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSelectedPageType(null);
              setSelectedUseCase(null);
              onFilterChange(null, null);
            }}
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
