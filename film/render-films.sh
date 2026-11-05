set -e
npx remotion render src/index.jsx Memorial ../assets/film/memorial.mp4 --codec h264 --crf 23 --log error
npx remotion render src/index.jsx MemorialVertical ../assets/film/memorial-vertical.mp4 --codec h264 --crf 25 --log error
echo done
