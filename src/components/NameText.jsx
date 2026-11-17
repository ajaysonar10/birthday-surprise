import { config, withName } from '../config.js'

/**
 * Renders any config string, highlighting every occurrence of the
 * configured name. Used by every section so the name is only ever
 * defined in src/config.js.
 */
export default function NameText({ text, className = 'name-highlight' }) {
  const name = config.person.name
  const filled = withName(text)

  if (!name || !filled.includes(name)) return filled

  return filled.split(name).flatMap((chunk, index) =>
    index === 0
      ? [chunk]
      : [
          <span key={`name-${index}`} className={className}>
            {name}
          </span>,
          chunk,
        ],
  )
}
