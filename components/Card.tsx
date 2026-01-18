import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-black dark:hover:shadow-dark-md`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-semibold leading-8 tracking-tight text-black dark:text-white">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-600 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-black underline underline-offset-4 hover:no-underline dark:text-white"
            aria-label={`Link to ${title}`}
          >
            Learn more →
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
