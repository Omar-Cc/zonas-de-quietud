import * as React from 'react'
import type { FAQ } from '../types'

interface FAQItemProps {
  faq: FAQ
}

export function FAQItem({ faq }: Readonly<FAQItemProps>) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="overflow-hidden rounded-lg border">
      <button
        onClick={() => setOpen((s) => !s)}
        className="bg-background flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
            ?
          </div>
          <div className="font-medium">{faq.q}</div>
        </div>
        <div className="text-muted-foreground text-sm">{open ? '-' : '+'}</div>
      </button>

      {open && (
        <div className="text-muted-foreground bg-white px-4 py-3 text-sm">
          {faq.a}
        </div>
      )}
    </div>
  )
}
