import { Post } from '@/components/post';

export default function Home() {
  return (
    <div className="container mx-auto">
      <Post
        image={{ src: '/simonkarman.png', alt: 'Simon Karman' }}
        link={{ to: '/about', text: 'More information about me' }}
        title="Welcome to simonkarman.nl"
      >
        <p className="mb-4">
          My name is <b>Simon Karman</b>. I am a Cloud Consultant at Xebia Cloud and a hobbyist Game Developer.
          I love to architect and develop systems such as cloud infrastructures, (board) games, and web applications.
        </p>
        <p>
          Building software effectively requires a modern way of working, in which development culture is the key.
          A big part of such a culture is sharing knowledge.
          On this website you can find a portfolio of some of the projects I worked on, more information about me, and get in contact with me.
        </p>
      </Post>
      <h2 className="border-b font-bold text-2xl lg:text-xl mt-8 mb-3 px-2 text-center">
        Latest Projects
      </h2>
    </div>
  );
}
