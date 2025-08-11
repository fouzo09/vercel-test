export async function GET() {
  const response = await fetch('https://api.djomy.africa/server-ip');
  const data = await response.text();

  const lines = data.split('\n');
  const result = {
    serverIP: lines[0]?.replace('Server IP: ', ''),
    remoteIP: lines[1]?.replace('Remote: ', ''),
    allowed: lines[2]?.replace('Allowed: ', '') === '1'
  };

  return Response.json(result);
}