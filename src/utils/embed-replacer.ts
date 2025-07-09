export function fillEmbedTemplate(
  embed: unknown,
  context: Record<string, string>,
): unknown {
  const rawJson = JSON.stringify(embed)
  const replaced = Object.entries(context).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
    rawJson,
  )
  return JSON.parse(replaced)
}
