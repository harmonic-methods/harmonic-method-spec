"""Build the downloadable starter kit from the canonical Harmonic Method files."""

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
KIT_NAME = "harmonic-method-starter-kit"
REVIEW_NAME = "review-a-capability.md"
SAMPLE_NAME = "sample-capability.md"
SKILL = "skills/coda-quality-check/SKILL.md"
SAMPLE_CODA = "examples/systems/client-commitments/coda.yml"
SAMPLE_BEAT = "examples/systems/client-commitments/beats/client-estimate-approval/beat.yml"


def source(path):
    return (ROOT / path).read_text(encoding="utf-8").rstrip("\n")


def yaml_section(path):
    return f"## `{path}`\n\n```yaml\n{source(path)}\n```\n"


def build(output):
    attribution = (
        "Source: The Harmonic Method by Codazen, Inc., "
        "[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)."
    )
    references = "\n".join(
        yaml_section(f"specs/{name}.yml")
        for name in ("spec-set", "coda", "beat", "system", "portfolio")
    )
    review = (
        "# Review a proposed capability\n\n"
        "Apply the rubric below to the capability in the user's document. "
        "For a proposal written in prose, identify its title, intended outcome "
        "(Coda), and description from the text. Use any stated broader goal as "
        "parent context. If it is unclear whether the capability serves a "
        "broader outcome, ask for that context before scoring.\n\n"
        "The original rubric and its referenced specs follow. Use the embedded "
        "sections for the named paths. Report the results required by the rubric "
        "and identify the single most useful improvement.\n\n"
        f"{attribution}\n\n"
        f"## Canonical rubric from `{SKILL}`\n\n"
        f"````markdown\n{source(SKILL)}\n````\n\n"
        f"{references}"
    )
    sample = (
        "# Sample capability for review\n\n"
        "Review the client estimate approval capability. The client commitments "
        "system gives the broader outcome it serves.\n\n"
        f"{attribution}\n\n"
        f"{yaml_section(SAMPLE_BEAT)}\n"
        f"{yaml_section(SAMPLE_CODA)}"
    )

    output.mkdir(parents=True, exist_ok=True)
    (output / REVIEW_NAME).write_text(review, encoding="utf-8")
    (output / SAMPLE_NAME).write_text(sample, encoding="utf-8")
    with ZipFile(output / f"{KIT_NAME}.zip", "w", compression=ZIP_DEFLATED) as archive:
        archive.write(ROOT / "starter-kit/START_HERE.md", f"{KIT_NAME}/START_HERE.md")
        archive.writestr(f"{KIT_NAME}/{REVIEW_NAME}", review)
        archive.writestr(f"{KIT_NAME}/{SAMPLE_NAME}", sample)
        archive.mkdir(f"{KIT_NAME}/your-files/")
        for path in ("LICENSE", "LICENSE-CONTENT", "TRADEMARKS.md"):
            archive.write(ROOT / path, f"{KIT_NAME}/{path}")
        for directory in ("skills", "specs", "examples"):
            for path in sorted((ROOT / directory).rglob("*")):
                if path.is_file():
                    archive.write(path, f"{KIT_NAME}/{path.relative_to(ROOT).as_posix()}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path, help="Directory for the kit and chat attachments")
    build(parser.parse_args().output)
