"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * A wrapper component that renders a collapsible container using Radix UI, forwarding all props and adding a data attribute for identification.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * A trigger component that toggles the open or closed state of a collapsible section.
 *
 * Forwards all props to the underlying Radix UI CollapsibleTrigger and adds a `data-slot="collapsible-trigger"` attribute.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Renders collapsible content that expands or collapses based on the parent Collapsible state.
 *
 * Forwards all props to the underlying Radix UI CollapsibleContent component.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
