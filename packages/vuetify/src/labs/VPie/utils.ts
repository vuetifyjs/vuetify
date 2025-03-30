import { VPieSeries } from "./types";

export function formatTextTemplate (template: string, segment?: VPieSeries) {
  return segment
    ? template
      .replaceAll('[title]', segment.title)
      .replaceAll('[value]', String(segment.value))
    : undefined
}
