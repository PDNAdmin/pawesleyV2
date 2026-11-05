set -e
npx remotion render src/index.jsx ShowreelVertical ../assets/film/showreel-vertical.mp4 --codec h264 --crf 31 --scale 0.75 --log error
npx remotion still src/index.jsx Showreel ../assets/film/showreel-poster.jpg --frame 40 --image-format jpeg --jpeg-quality 80 --scale 0.75 --log error
npx remotion still src/index.jsx ShowreelVertical ../assets/film/showreel-vertical-poster.jpg --frame 40 --image-format jpeg --jpeg-quality 80 --scale 0.75 --log error
npx remotion render src/index.jsx Memorial ../assets/film/memorial.mp4 --codec h264 --crf 22 --log error
npx remotion render src/index.jsx MemorialVertical ../assets/film/memorial-vertical.mp4 --codec h264 --crf 24 --log error
npx remotion still src/index.jsx Memorial ../assets/film/memorial-poster.jpg --frame 120 --image-format jpeg --jpeg-quality 84 --log error
ls -la ../assets/film
