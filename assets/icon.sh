# size=(16 32 48 64 128 256 512 1024)

# echo Making bitmaps from your svg...

# for i in ${size[@]}; do
#   inkscape --export-type="png" --export-filename="logo/${i}x$i.png" -w $i -h $i icon.png
# done 
# convert -density 256x256 -background transparent icon.svg -define icon:auto-resize=256,48,32,16 -colors 256 logo/icon.ico
sips -z 16 16 icon.png -o icons.iconset/icon_16x16.png
sips -z 32 32 icon.png -o icons.iconset/icon_16x16@2x.png
sips -z 32 32 icon.png -o icons.iconset/icon_32x32.png
sips -z 64 64 icon.png -o icons.iconset/icon_32x32@2x.png
sips -z 128 128 icon.png -o icons.iconset/icon_128x128.png
sips -z 256 256 icon.png -o icons.iconset/icon_128x128@2x.png
sips -z 256 256 icon.png -o icons.iconset/icon_256x256.png
sips -z 512 512 icon.png -o icons.iconset/icon_256x256@2x.png
sips -z 512 512 icon.png -o icons.iconset/icon_512x512.png
sips -z 1024 1024 icon.png -o icons.iconset/icon_512x512@2x.png
