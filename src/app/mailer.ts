/**
 * The mailer module is responsible for sending emails to the user. It uses the mailer API defined in the simonkarman-serverless BitBucket project to
 *  send emails. The mailer implementation can be found at: `https://bitbucket.org/simonkarman/simonkarman-serverless/src/master/`.
 *
 * In the dev environment, the mailer module will not send emails but instead return a fake response. This is to prevent sending emails while testing
 *  out functionality.
 *
 * It is hosted on AWS Lambda and is accessible through the following base URL.
 */
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
