import farey from '@js-toolkit/utils/farey';

export interface AspectRatio {
  /** Approximate width ratio */
  width: number;
  /** Approximate height ratio */
  height: number;
  /** Actual ratio value */
  ratio: number;
}

/** Approximate aspect ratio */
export function getAspectRatio(width: number, height: number): AspectRatio {
  const ratio = width / height;
  // https://stackoverflow.com/a/43016456
  const [rwidth, rheight] = farey(ratio, 50);
  return { width: rwidth, height: rheight, ratio };
}

export default getAspectRatio;
