const mailerBaseUrl = 'https://2ct3ol18ee.execute-api.eu-west-1.amazonaws.com/dev';
// eslint-disable-next-line no-process-env
const isDev = process.env.NODE_ENV !== 'production';

async function sendEmail(type: string, body: { [key: string]: string }): Promise<string> {
  if (isDev) {
    if (type === 'contact' && body.name.toLowerCase().localeCompare('error') === 0) {
      throw new Error('fake error');
    }
    return 'fake response';
  }
  const result = await fetch(`${mailerBaseUrl}/${type}`, { method: 'POST', body: JSON.stringify(body) });
  return result.text();
}

export async function sendContactMail(inputValues: { [key: string]: string }): Promise<string> {
  return sendEmail('contact', inputValues);
}

export async function sendDownloadMail(inputValues: { [key: string]: string }): Promise<string> {
  return sendEmail('download', inputValues);
}
