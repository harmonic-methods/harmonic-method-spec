"""Package the actual teaching example for readers without repository access."""
from pathlib import Path
from shutil import copyfile
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
source = root / 'tutorials' / 'estimate-approval'
public = root / 'site' / 'public' / 'downloads'
files = sorted(path for path in source.rglob('*') if path.is_file())
assert files, 'The teaching example must exist before packaging.'
public.mkdir(parents=True, exist_ok=True)
with ZipFile(public / 'estimate-approval.zip', 'w', ZIP_DEFLATED) as archive:
    for path in files:
        relative = path.relative_to(source)
        destination = public / 'estimate-approval' / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        copyfile(path, destination)
        archive.write(path, Path('estimate-approval') / relative)
