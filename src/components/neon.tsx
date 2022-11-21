import type { ReactNode } from 'react'

import clsx from 'clsx'

export const NeonBox = ({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return <div className={clsx(className, 'rounded border-4 shadow')}>{children}</div>
}

export const NeonText = ({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return <span className={clsx(className, 'text-shadow')}>{children}</span>
}
