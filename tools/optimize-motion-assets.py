"""Gera variantes locais das imagens existentes; originais e créditos são preservados.
Executar com o Python fornecido pelo ambiente, que já inclui Pillow.
Não faz parte de um build: as variantes geradas são arquivos estáticos do site.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
output = root / 'assets/motion'
(output / 'escudos').mkdir(parents=True, exist_ok=True)
(output / 'hero').mkdir(exist_ok=True)
for source in (root / 'assets/escudos').glob('*.png'):
    image = Image.open(source).convert('RGBA')
    image.thumbnail((96, 112))
    image.save(output / 'escudos' / f'{source.stem}.webp', quality=88, method=6)
for source in (root / 'assets/identidade/hero').iterdir():
    if source.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}:
        continue
    for size in (800, 1600):
        image = Image.open(source).convert('RGB')
        image.thumbnail((size, size))
        image.save(output / 'hero' / f'{source.stem}-{size}.webp', quality=85, method=6)
