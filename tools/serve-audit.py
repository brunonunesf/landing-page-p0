"""Servidor de auditoria com gzip, sem dependências ou etapa de build.
Uso: python3 tools/serve-audit.py --port 8767 --directory .
Permite comparar as duas versões com a mesma compressão de transferência.
"""
import argparse
import gzip
import io
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class AuditHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = Path(self.translate_path(self.path.split('?', 1)[0]))
        if path.is_dir():
            path = path / 'index.html'
        if path.is_file() and path.suffix in {'.html', '.css', '.js', '.svg', '.json'} and 'gzip' in self.headers.get('Accept-Encoding', ''):
            payload = gzip.compress(path.read_bytes(), compresslevel=6)
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(str(path)))
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Vary', 'Accept-Encoding')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            return io.BytesIO(payload)
        return super().send_head()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8767)
    parser.add_argument('--directory', default='.')
    args = parser.parse_args()
    from functools import partial
    ThreadingHTTPServer(('127.0.0.1', args.port), partial(AuditHandler, directory=args.directory)).serve_forever()
