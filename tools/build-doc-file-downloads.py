"""Expose generated chat attachments without maintaining copies of their sources."""
from pathlib import Path
from runpy import run_path
from shutil import copyfile
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]


def build():
    destination = ROOT / 'site/public/downloads/starter-kit'
    destination.mkdir(parents=True, exist_ok=True)
    kit_builder = run_path(str(ROOT / 'tools/build-starter-kit.py'))['build']
    with TemporaryDirectory() as temporary:
        output = Path(temporary)
        kit_builder(output)
        for name in ('review-a-capability.md', 'sample-capability.md'):
            copyfile(output / name, destination / name)


if __name__ == '__main__':
    build()
