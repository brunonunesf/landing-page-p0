#!/usr/bin/env python3
"""Gate de commit de uso único. approve só após autorização humana pós-entrega."""
import json
import subprocess
import sys
from pathlib import Path


def git(*args):
    return subprocess.check_output(["git", *args], text=True).strip()


def snapshot():
    head = subprocess.run(
        ["git", "rev-parse", "--verify", "HEAD"],
        text=True, capture_output=True,
    )
    return {"tree": git("write-tree"),
            "head": head.stdout.strip() if head.returncode == 0 else None}


def main():
    if len(sys.argv) != 2 or sys.argv[1] not in {"approve", "check"}:
        print("Uso: python3 tools/commit-approval.py approve|check", file=sys.stderr)
        return 2
    token = Path(git("rev-parse", "--git-path", "commit-approval.json"))
    if sys.argv[1] == "approve":
        token.write_text(json.dumps(snapshot()) + "\n")
        token.chmod(0o600)
        print("Autorização registrada para o conteúdo preparado. Uso único.")
        return 0
    try:
        approved = json.loads(token.read_text())
    except (OSError, ValueError):
        print("COMMIT BLOQUEADO: mostre o resultado e as evidências de celular e "
              "computador; aguarde autorização explícita posterior do usuário.",
              file=sys.stderr)
        return 1
    # Consome inclusive uma autorização obsoleta: nenhuma aprovação é reutilizada.
    token.unlink()
    if approved != snapshot():
        print("COMMIT BLOQUEADO: o conteúdo ou HEAD mudou após a autorização. "
              "Mostre o novo resultado e obtenha nova aprovação.", file=sys.stderr)
        return 1
    print("Commit liberado: autorização de uso único consumida.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
