'use client'

import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import posthog from '../lib/posthog-browser'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  const searchConfig = siteMetadata.search

  if (searchConfig && (searchConfig.provider === 'algolia' || searchConfig.provider === 'kbar')) {
    const SearchButtonWrapper = searchConfig.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper
        aria-label="Search"
        className="focus-ring flex h-11 min-w-[44px] items-center justify-center gap-2 px-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary transition-colors hover:text-signal dark:text-text-inverse-tertiary"
        onClick={() =>
          posthog.capture('search_opened', {
            search_provider: searchConfig.provider,
          })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <span className="hidden md:inline">Search</span>
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
