import { currentFocus } from '@/data/appsData'

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 bg-signal" />
    <span className="font-display text-base font-bold tracking-[-0.02em] text-text-primary dark:text-text-inverse">
      MANNAI
    </span>
    <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary dark:text-text-inverse-tertiary sm:inline">
      Ser. 01
    </span>
  </div>
)

export { currentFocus }
export default Logo
