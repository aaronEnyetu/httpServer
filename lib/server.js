import net from 'net';

const logOut =  (...args)  => console.log('[server]', ...args);

export const serve = (host, port) => {
    const server = net.createServer((socket) => {
        logOut('A peer connected');
        socket.on('data', (data) => {
            const dataStr = data.toString()
            logOut('Got data:', dataStr);
            const lines = dataStr.split('\n')
            const startLine = lines[0];
            const [method, path,] = startLine.split(' ');
            if (method == 'GET' && path == '/') {
                const body = `<html>
                <main>
                <h1>My Blog</h1>
                <article>
                <h2>About Me</h2>
                <p> I am a result-oriented and collaborative problem-solving software engineer with 10+ years in agricultural research.
                 Seeking a position in the Software Engineering field where my passion for programming, 
                 testing and collaboration skills will be fully utilized. I am empowered to drive innovation by coming up with
                 new and exciting ideas to creatively solve issues</p>
                  <h2>Skills</h2>
                  <li>Javascript</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>React</li>
                  <li>PostgreSQL</li>
                </article>
                </main>
                
                </html>`;
                socket.write(`HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html

${body}`)
            } else if (method === 'GET' && path == '/posts') {
                               const jsBody = JSON.stringify({
                    "name": "Aaron",
                    "city": "Austin",
                    "occupation": "Software Engineer",
                });
                socket.write(`HTTP/1.1 200 Ok
Content-Length: ${jsBody.length}
Content-Type: application/json

${jsBody}`)
            }
            else if (method === "POST" && path == '/mail') {
                const postBody = "You posted successfully!"
                socket.write(`HTTP/1.1 204 Ok
Content-Length: ${postBody.length}
Content-Type: text/plain

${postBody}`)
            }  else {
                const errorRes = `<html>
                <main>
                <h1>404, Page Not Found</h1>
                </main>
                </html>`;
                socket.write(`HTTP/1.1 404 Nope
Content-Length: ${errorRes.length}
Accept: application/json, text/html

${errorRes}`);
              }
            });
            socket.on('end', () => {
              logOut('Client disconnected');
            });
          });
    server.listen(port, host, () => {
        logOut('My server is up!');
    });
    logOut('Attempting to start server');
    return server;        
        
    }
