"""Static server for the book that never lets the browser cache a stale build."""
import functools
import http.server
import socketserver
import sys
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()


socketserver.TCPServer.allow_reuse_address = True
handler = functools.partial(NoCache, directory=str(Path(__file__).parent))
with socketserver.TCPServer(('127.0.0.1', PORT), handler) as httpd:
    print(f'http://localhost:{PORT}')
    httpd.serve_forever()
