export function get2dContextError(): Error {
  return new Error('Failed to get canvas 2d context.');
}

const getDefaultWidth = (element: CanvasImageSource): number => {
  if (element instanceof HTMLVideoElement) return element.videoWidth;
  if (element.width instanceof SVGAnimatedLength) return element.width.animVal.value;
  return element.width;
};

const getDefaultHeight = (element: CanvasImageSource): number => {
  if (element instanceof HTMLVideoElement) return element.videoHeight;
  if (element.height instanceof SVGAnimatedLength) return element.height.animVal.value;
  return element.height;
};

export interface TakeSnapshotOptions {
  width?: number;
  height?: number;
  type?: string;
  quality?: number;
}

export function takeSnapshot(
  element: CanvasImageSource,
  {
    width = getDefaultWidth(element),
    height = getDefaultHeight(element),
    type = 'image/jpeg',
    quality = 1,
  }: TakeSnapshotOptions = {}
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw get2dContextError();

  ctx.drawImage(element, 0, 0);

  return canvas.toDataURL(type, quality);
}

export function takeSnapshotAsync(
  element: CanvasImageSource,
  {
    width = getDefaultWidth(element),
    height = getDefaultHeight(element),
    type = 'image/jpeg',
    quality = 1,
  }: TakeSnapshotOptions = {}
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw get2dContextError();

    ctx.drawImage(element, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob == null) reject(new Error('Unable get blob'));
        else resolve(blob);
      },
      type,
      quality
    );
  });
}