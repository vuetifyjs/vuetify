import { VPieItem } from "./types";

export function formatTextTemplate (template: string, segment?: VPieItem) {
  return segment
    ? template
      .replaceAll('[title]', segment.title)
      .replaceAll('[value]', String(segment.value))
    : undefined
}
