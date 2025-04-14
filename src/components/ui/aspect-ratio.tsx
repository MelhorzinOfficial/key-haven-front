"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Renders a container that maintains a consistent aspect ratio for its content.
 *
 * Accepts all properties supported by {@link AspectRatioPrimitive.Root}.
 *
 * @returns A React element that enforces the specified aspect ratio.
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
