import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import NewsletterForm from 'pliny/ui/NewsletterForm'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/* Newsletter Section */}
        {siteMetadata.newsletter?.provider && (
          <div className="mb-12 w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black md:p-8">
            <div className="mx-auto text-center">
              <h2 className="mb-3 font-display text-xl font-bold text-black dark:text-white md:text-2xl">
                Stay Updated
              </h2>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Get the latest posts and updates delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        )}
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          {/*<SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />*/}
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="hover:underline">
            {siteMetadata.title}
          </Link>
        </div>
        <div className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          {/*
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>

      */}
        </div>
      </div>
    </footer>
  )
}
