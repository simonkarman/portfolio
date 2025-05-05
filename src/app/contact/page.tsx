'use client';
import { sendContactMail } from '@/app/mailer';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const profiles = [
  { img: 'github', url: 'https://www.github.com/simonkarman/' },
  { img: 'bitbucket', url: 'https://www.bitbucket.org/simonkarman/' },
  { img: 'linkedin', url: 'https://www.linkedin.com/in/simonkarman' },
  { img: 'xebia', url: 'https://xebia.com/author/simon-karman/' },
  { img: 'youtube', url: 'https://www.youtube.com/user/SimonKarman' },
  { img: 'twitter', url: 'https://www.twitter.com/simon_karman' },
];

const inputs = [
  {
    title: 'Name',
    name: 'name',
    isValid(value: string) {
      return value.length >= 3;
    },
    validationMessage: 'should be at least 3 characters long',
  },
  {
    title: 'Email',
    name: 'email',
    isValid(value: string) {
      return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    },
    validationMessage: 'should be a valid email address',
  },
  {
    title: 'Subject',
    name: 'subject',
    isValid(value: string) {
      return value.length >= 3;
    },
    validationMessage: 'should be at least 3 characters long',
  },
  {
    title: 'Message',
    name: 'content',
    textarea: true,
    isValid(value: string) {
      return value.length >= 3;
    },
    validationMessage: 'should be at least 3 characters long',
  },
];

export default function About() {
  const [inputValues, setInputValues] = useState(() => {
    const values: { [key: string]: string } = {};
    inputs.forEach(input => values[input.name] = '');
    return values;
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [sendingErrorMessage, setSendingErrorMessage] = useState<string>('');
  const [emailHasBeenSend, setEmailHasBeenSend] = useState<boolean>(false);
  const [mailSendResponse, setMailSendResponse] = useState<string | undefined>(undefined);

  useEffect(() => {
    setValidationErrors([]);
    setSendingErrorMessage('');
  }, [inputValues]);

  async function sendEmail() {
    const valid = inputs.every(input => input.isValid(inputValues[input.name]));

    if (valid) {
      setEmailHasBeenSend(true);
      setValidationErrors([]);
      try {
        setMailSendResponse(await sendContactMail(inputValues));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setEmailHasBeenSend(false);
        setSendingErrorMessage(err.toString());
      }
    } else {
      setValidationErrors(inputs
        .filter(input => !input.isValid(inputValues[input.name]))
        .map(input => input.title + ' ' + input.validationMessage));
    }
  }

  return (<div className="container mx-auto flex flex-wrap justify-between">
    <div className="w-full my-2">
      <div className="p-5 overflow-hidden rounded-lg text-justify">
        <h1 className="font-bold text-3xl border-b mb-4">
          Contact Me
        </h1>
        <p>
          I am <b>Simon Karman</b> MSc. I am a cloud consultant and hobbyist game developer from the Netherlands. On this page you can find profiles
          of me on various websites and find ways to get in contact with me.
        </p>
      </div>
      <div className="mx-auto mt-2 mb-6 w-3/4 xl:w-1/2 flex flex-wrap bg-gray-100 border rounded-xl p-2">
        {profiles.map(profile => <div
          key="profile.img"
          className="w-1/2 sm:w-1/3 p-2 hover:p-1"
        >
          <a href={profile.url} target="_blank" rel="noreferrer">
            <Image
              src={`/contact-icons/${profile.img}.png`}
              width={240}
              height={240}
              alt={profile.url}
              className="w-full h-full rounded-lg bg-white shadow object-cover p-2"
            />
          </a>
        </div>)}
      </div>
    </div>
    <div className="w-full my-2 p-5 mb-10">
      <div className='flex justify-between items-center'>
        <h1 className="flex-grow font-bold text-3xl border-b mb-4">
          Contact Form
        </h1>
        <div className="rounded-xl bg-gray-300 text-gray-800 font-bold p-2 text-center text-xs border-b">
          Build with <Image alt="lambda" width={24} height={24} className="inline" src="/contact-icons/lambda.png"/> by me.
        </div>
      </div>
      {!emailHasBeenSend && <form>
        <p className="mb-4">
          You can contact me by submitting the following form. I will try to respond as quickly as possible.
        </p>
        <div className="flex flex-wrap">
          {inputs.map(input => <div
            key={input.name}
            className={(input.textarea ? '' : 'lg:w-1/2 xl:w-1/3 ') + 'mb-3 mx-1 w-full flex-grow'}
          >
            <label htmlFor={input.name} className="block text-sm font-bold mb-2">
              {input.title}
            </label>
            {!input.textarea &&
              <input
                value={inputValues[input.name]}
                onChange={e => setInputValues({ ...inputValues, [input.name]: e.target.value })}
                placeholder={input.title}
                className={(inputValues[input.name].length === 0 || input.isValid(inputValues[input.name]) ? '' : 'border-red-700 ')
                  + 'w-full py-2 px-3 border text-gray-800 leading-tight focus:outline-none focus:shadow-outline appearance-none'}
                type="text"
              />}
            {input.textarea && <textarea
              value={inputValues[input.name]}
              onChange={e => setInputValues({ ...inputValues, [input.name]: e.target.value })}
              placeholder={input.title}
              className="w-full py-2 px-3 border text-gray-800 leading-tight focus:outline-none focus:shadow-outline appearance-none h-40"
            />}
            <p className={(inputValues[input.name].length === 0 || input.isValid(inputValues[input.name]) ? 'hidden ' : '')
              + 'py-2 px-1 text-red-600 text-sm'}>
              {input.title + ' ' + input.validationMessage}
            </p>
          </div>)}
          <div className="mx-1 w-full">
            <button
              onClick={sendEmail}
              className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 border border-green-800 text-white font-bold tracking-wider shadow"
              type="button"
            >
              Send message!
            </button>
            {validationErrors.length > 0 && <p className="p-3 text-red-700 bg-red-50 border-b border-r border-l border-red-200 rounded-b-lg">
              <span className="border-b border-red-200 font-bold">
                    Please double check the following fields:
              </span>
              <ul className="ml-2">
                {validationErrors.map(validationError => <li key={validationError}>
                  {validationError}
                </li>)}
              </ul>
            </p>}
            {sendingErrorMessage.length > 0 && <p className="py-3 text-red-700">
              There was an error sending your mail. It was NOT send. Error info: {sendingErrorMessage}
            </p>}
          </div>
        </div>
      </form>}
      {emailHasBeenSend && <p>
        Thank you for filling out the contact form, your message was successfully send. I will try to respond as quickly as possible.
        {mailSendResponse && <pre>{JSON.stringify(mailSendResponse)}</pre>}
      </p>}
    </div>
  </div>);
}
