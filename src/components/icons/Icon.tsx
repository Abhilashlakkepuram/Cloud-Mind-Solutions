import { icons, type IconName } from "./registry";

export type { IconName };

export interface IconProps {
  name: IconName;
  /** Rendered square size in px. `width`/`height` are accepted as aliases. */
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  /**
   * Supply ONLY when the icon carries meaning no adjacent text conveys — it
   * becomes the accessible name. Otherwise the icon stays decorative and is
   * hidden from assistive tech, which is the right default here because almost
   * every icon on this site sits beside a label.
   */
  title?: string;
}

/**
 * Renders an icon from the registry.
 *
 * The registry holds raw SVG strings rather than components, so this injects
 * them and sizes the child <svg> with CSS. `currentColor` throughout means
 * colour comes from the parent's text colour — never set fill/stroke here.
 *
 * The markup is a static, first-party constant; no user input reaches it.
 */
export function Icon({ name, size, width, height, className, title }: IconProps) {
  const px = size ?? width ?? height ?? 24;
  const markup = icons[name];

  if (!markup) {
    // Fails loudly in development rather than rendering an invisible gap.
    if (process.env.NODE_ENV !== "production") {
      throw new Error(`Icon "${name}" is not in the registry.`);
    }
    return null;
  }

  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ width: px, height: px }}
      className={[
        "inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full",
        className ?? "",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

/** Builds a named wrapper so call sites can stay `<IconMail width={18} />`. */
export function createIcon(name: IconName) {
  const Named = (props: Omit<IconProps, "name">) => <Icon name={name} {...props} />;
  Named.displayName = `Icon(${name})`;
  return Named;
}
