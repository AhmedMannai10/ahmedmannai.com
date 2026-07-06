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
          className="h-6 w-6 text-ink hover:text-stone dark:text-bone"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </SearchButtonWrapper>
    )
  }
}

export default SearchButton
