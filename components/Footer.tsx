import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import NewsletterForm from 'pliny/ui/NewsletterForm'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-800">
        <div className="flex flex-col items-center gap-8">
          {/* Newsletter Section */}
          {siteMetadata.newsletter?.provider && (
            <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black md:p-8">
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

          {/* Quick nav links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/blog"
              className="transition-colors hover:text-black hover:underline dark:hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="transition-colors hover:text-black hover:underline dark:hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-black hover:underline dark:hover:text-white"
            >
              About
            </Link>
          </nav>

          {/* Social icons */}
          <div className="flex space-x-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            <SocialIcon kind="x" href={siteMetadata.x} size={6} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          </div>

          {/* Copyright */}
          <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            {siteMetadata.author} · © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}
