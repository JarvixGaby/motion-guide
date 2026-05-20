'use client';
import { Search, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AnimationEntry } from '@/types/entry';
import { PageType, UseCase, PAGE_TYPES, USE_CASES, Category, CATEGORIES } from '@/data/taxonomies';
import { searchEntries } from '@/lib/search';
import { DifficultyBadge } from './DifficultyBadge';

export function SearchBar({
  entries,
  selectedCategory,
  selectedPageType,
  selectedUseCase,
  onCategoryChange,
  onPageTypeChange,
  onUseCaseChange,
}: {
  entries: AnimationEntry[];
  selectedCategory: Category | null;
  selectedPageType: PageType | null;
  selectedUseCase: UseCase | null;
  onCategoryChange: (category: Category | null) => void;
  onPageTypeChange: (pageType: PageType | null) => void;
  onUseCaseChange: (useCase: UseCase | null) => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AnimationEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showPageTypeMenu, setShowPageTypeMenu] = useState(false);
  const [showUseCaseMenu, setShowUseCaseMenu] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const pageTypeMenuRef = useRef<HTMLDivElement>(null);
  const useCaseMenuRef = useRef<HTMLDivElement>(null);

  // Apply filters before search
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesCategory = !selectedCategory || entry.category === selectedCategory;
      const matchesPageType = !selectedPageType || entry.pageTypes.includes(selectedPageType);
      const matchesUseCase = !selectedUseCase || entry.useCases.includes(selectedUseCase);
      return matchesCategory && matchesPageType && matchesUseCase;
    });
  }, [entries, selectedCategory, selectedPageType, selectedUseCase]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchEntries(query, filteredEntries);
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, filteredEntries]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setShowCategoryMenu(false);
      }

      if (
        pageTypeMenuRef.current &&
        !pageTypeMenuRef.current.contains(event.target as Node)
      ) {
        setShowPageTypeMenu(false);
      }

      if (
        useCaseMenuRef.current &&
        !useCaseMenuRef.current.contains(event.target as Node)
      ) {
        setShowUseCaseMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(`/entry/${results[selectedIndex].slug}`);
          setIsOpen(false);
          setQuery('');
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Editorial Search Bar */}
      <div className="relative flex flex-col sm:flex-row sm:items-center border-b border-stone-300 pb-4 transition-colors focus-within:border-stone-900">
        <div className="flex flex-1 items-center">
          <Search className="h-6 w-6 text-stone-300 mr-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search animations..."
            className="w-full bg-transparent font-display text-2xl font-light text-stone-900 placeholder-stone-300 focus:outline-none"
          />
          {query && (
            <button
              onClick={handleClear}
              className="px-4 text-stone-300 hover:text-stone-900 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Integrated Filters */}
        <div className="mt-4 flex items-center gap-6 sm:mt-0 sm:border-l sm:border-stone-200 sm:pl-6">
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-stone-400 md:inline-block">Filters</span>

          {/* Category Dropdown */}
          <div className="relative" ref={categoryMenuRef}>
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className={`group flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest transition-colors ${selectedCategory ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
            >
              {selectedCategory || 'Category'}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showCategoryMenu ? 'rotate-180' : ''}`} />
            </button>

            {showCategoryMenu && (
              <div className="absolute right-0 top-full mt-4 z-50 max-h-80 w-56 overflow-y-auto bg-white border border-stone-200 shadow-2xl">
                <button
                  onClick={() => {
                    onCategoryChange(null);
                    setShowCategoryMenu(false);
                  }}
                  className="w-full px-5 py-4 text-left text-[11px] font-mono uppercase tracking-widest text-stone-400 hover:bg-stone-50 hover:text-stone-900 transition-colors border-b border-stone-100"
                >
                  All Categories
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full px-5 py-3 text-left text-[11px] font-mono uppercase tracking-widest transition-colors ${selectedCategory === category
                      ? 'bg-stone-50 text-stone-900'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Page Type Dropdown */}
          <div className="relative" ref={pageTypeMenuRef}>
            <button
              onClick={() => setShowPageTypeMenu(!showPageTypeMenu)}
              className={`group flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest transition-colors ${selectedPageType ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
            >
              {selectedPageType || 'Page Type'}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showPageTypeMenu ? 'rotate-180' : ''}`} />
            </button>

            {showPageTypeMenu && (
              <div className="absolute right-0 top-full mt-4 z-50 max-h-80 w-56 overflow-y-auto bg-white border border-stone-200 shadow-2xl">
                <button
                  onClick={() => {
                    onPageTypeChange(null);
                    setShowPageTypeMenu(false);
                  }}
                  className="w-full px-5 py-4 text-left text-[11px] font-mono uppercase tracking-widest text-stone-400 hover:bg-stone-50 hover:text-stone-900 transition-colors border-b border-stone-100"
                >
                  All Page Types
                </button>
                {PAGE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onPageTypeChange(type);
                      setShowPageTypeMenu(false);
                    }}
                    className={`w-full px-5 py-3 text-left text-[11px] font-mono uppercase tracking-widest transition-colors ${selectedPageType === type
                      ? 'bg-stone-50 text-stone-900'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Use Case Dropdown */}
          <div className="relative" ref={useCaseMenuRef}>
            <button
              onClick={() => setShowUseCaseMenu(!showUseCaseMenu)}
              className={`group flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest transition-colors ${selectedUseCase ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
            >
              {selectedUseCase || 'Use Case'}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showUseCaseMenu ? 'rotate-180' : ''}`} />
            </button>

            {showUseCaseMenu && (
              <div className="absolute right-0 top-full mt-4 z-50 max-h-80 w-56 overflow-y-auto bg-white border border-stone-200 shadow-2xl">
                <button
                  onClick={() => {
                    onUseCaseChange(null);
                    setShowUseCaseMenu(false);
                  }}
                  className="w-full px-5 py-4 text-left text-[11px] font-mono uppercase tracking-widest text-stone-400 hover:bg-stone-50 hover:text-stone-900 transition-colors border-b border-stone-100"
                >
                  All Use Cases
                </button>
                {USE_CASES.map((useCase) => (
                  <button
                    key={useCase}
                    onClick={() => {
                      onUseCaseChange(useCase);
                      setShowUseCaseMenu(false);
                    }}
                    className={`w-full px-5 py-3 text-left text-[11px] font-mono uppercase tracking-widest transition-colors ${selectedUseCase === useCase
                      ? 'bg-stone-50 text-stone-900'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                      }`}
                  >
                    {useCase}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Clear */}
          {(selectedCategory || selectedPageType || selectedUseCase) && (
            <button
              onClick={() => {
                onCategoryChange(null);
                onPageTypeChange(null);
                onUseCaseChange(null);
              }}
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors ml-2"
              aria-label="Clear filters"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full z-50 mt-4 w-full bg-white border border-stone-200 shadow-2xl"
        >
          <div className="max-h-96 overflow-y-auto scrollbar-hide">
            {results.map((entry, index) => (
              <button
                key={entry.slug}
                onClick={() => {
                  router.push(`/entry/${entry.slug}`);
                  setIsOpen(false);
                  setQuery('');
                }}
                className={`w-full border-b border-stone-100 p-6 text-left transition-colors last:border-b-0 ${index === selectedIndex
                  ? 'bg-stone-50'
                  : 'hover:bg-stone-50'
                  }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-medium text-stone-900">
                      {entry.nameEn}
                    </h4>
                    <p className="mt-2 line-clamp-1 text-sm text-stone-500">
                      {entry.description}
                    </p>
                  </div>
                  <div className="pt-1">
                    <DifficultyBadge difficulty={entry.difficulty} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full z-50 mt-4 w-full bg-white border border-stone-200 p-12 text-center shadow-2xl"
        >
          <p className="font-display text-lg text-stone-900">No animations found for "{query}"</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-stone-400">
            Try: loading, spinner, skeleton, fade
          </p>
        </div>
      )}
    </div>
  );
}
