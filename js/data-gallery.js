/* Gallery — every photograph supplied for the memorial, drawn together from
   the family's photo archive, in the order they were curated. */

const GALLERY_COUNT = 32;

// photograph 8 was withdrawn at the family's request
const GALLERY = Array.from({ length: GALLERY_COUNT }, (_, i) => i + 1).filter(n => n !== 8).map(n => {
  const id = String(n).padStart(2, "0");
  return {
    id: n,
    full: `assets/photos/full/img-${id}.webp`,
    thumb: `assets/photos/thumb/img-${id}.webp`,
    alt: `Photograph ${n} of Pa. Wesley Olajide Ojo Aiyegboka from the family album`
  };
});
