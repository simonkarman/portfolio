import { Logo } from '@/components/logo';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitbucket, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return <footer className="text-sm">
    <div className="bg-darkblue-700 h-36 sm:h-40">
      <div className="bg-white pt-14 sm:pt-16 h-0 overflow-visible">
        <div className="container mx-auto -mt-14 sm:-mt-16 px-2">
          <Link href="/about" className="flex items-center bg-darkblue-400 p-6 rounded-lg shadow-lg">
            <div className="pr-6 text-white">
              <Logo size={18}/>
            </div>
            <div className="flex-col">
              <h1 className="font-oswald text-white font-extrabold uppercase text-xl md:text-2xl lg:text-3xl">
                Simon Karman
              </h1>
              <p className="text-gray-300 uppercase tracking-wide">
                Cloud Consultant and Game&nbsp;Developer
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <div className="bg-darkblue-700 text-gray-200 pb-8 sm:pb-12">
      <div className="container mx-auto px-6 flex gap-2 flex-col sm:flex-row justify-center sm:justify-between">
        <div className="flex justify-center sm:justify-between pt-4 sm:pt-0">
          <a target="_blank" href="https://www.github.com/simonkarman" className="px-2 lg:px-4" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} className="pr-1 flex-1"/>
            <span className="hidden md:inline">GitHub</span>
          </a>
          <a target="_blank" href="https://www.bitbucket.org/simonkarman" className="px-2 lg:px-4" rel="noreferrer">
            <FontAwesomeIcon icon={faBitbucket} className="pr-1 flex-1"/>
            <span className="hidden md:inline">Bitbucket</span>
          </a>
          <a target="_blank" href="https://www.youtube.com/user/simonkarman/videos" className="px-2 lg:px-4" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} className="pr-1 flex-1"/>
            <span className="hidden md:inline">Youtube</span>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/simonkarman/" className="px-2 lg:px-4" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="pr-1 flex-1"/>
            <span className="hidden md:inline">LinkedIn</span>
          </a>
        </div>
        <div className="flex justify-center sm:justify-between pt-4 sm:pt-0">
          <Link href="/" className="px-3 border-r">
            Home
          </Link>
          <Link href="/projects" className="hidden lg:inline px-3 border-r">
            Portfolio
          </Link>
          <Link href="/about" className="px-3 border-r">
            About&nbsp;Me
          </Link>
          <Link href="/contact" className="px-3">
            Contact&nbsp;Me
          </Link>
        </div>
      </div>
    </div>
  </footer>;
};
