k=$1; mkdir -p seq/$k; d=$(/root/yiwen/.venv/lib/python3.13/site-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2 -i raw/$k.mp4 2>&1 | grep -o "Duration: [0-9:.]*" | cut -d' ' -f2)
s=$(python3 -c "h,m,x='$d'.split(':');D=int(h)*3600+int(m)*60+float(x);print(max(0,min(1.0,D-7)))")
/root/yiwen/.venv/lib/python3.13/site-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2 -loglevel error -y -ss $s -t 7 -i raw/$k.mp4 -vf "fps=25,scale=1440:-2,eq=contrast=1.04:saturation=0.92" -q:v 5 seq/$k/%03d.jpg
echo $k $(ls seq/$k | wc -l)
