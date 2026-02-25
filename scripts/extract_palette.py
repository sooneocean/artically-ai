# 低算力色票抽取（示意）
# TODO: 用 Pillow + kmeans/median-cut

from PIL import Image
import sys


def extract_palette(image_path, n=5):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((128, 128))
    colors = img.getcolors(128*128)
    colors = sorted(colors, key=lambda x: x[0], reverse=True)
    return [c[1] for c in colors[:n]]

if __name__ == '__main__':
    path = sys.argv[1]
    palette = extract_palette(path)
    print(palette)
