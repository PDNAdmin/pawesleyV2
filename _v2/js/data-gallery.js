/* Gallery — every photograph supplied for the memorial, drawn together from
   the family's photo archive, in the order they were curated. */

const GALLERY_COUNT = 32;

const GALLERY = Array.from({ length: GALLERY_COUNT }, (_, i) => {
  const n = i + 1;
  const id = String(n).padStart(2, "0");
  return {
    id: n,
    full: `assets/photos/full/img-${id}.jpg`,
    thumb: `assets/photos/thumb/img-${id}.jpg`,
    alt: `Photograph ${n} of Pa. Wesley Olajide Ojo Aiyegboka from the family album`
  };
});
