// !! VELVET LINE: pa-* variants live in ./button-variants.ts so
// !! `pnpm dlx shadcn@<v> add button --overwrite` doesn't clobber them.
// !! If you regenerate this file, restore the import from ./button-variants
// !! and the data-variant / data-size attribute emission below.
// !! tests/ui/button-variants.test.ts snapshot will fail loudly if the
// !! pa-* variants vanish.

import { Button as ButtonPrimitive } from "@base-ui/react/button"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariantProps } from "./button-variants"

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & ButtonVariantProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
