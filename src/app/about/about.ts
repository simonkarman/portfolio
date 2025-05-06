export type Item = { at: string, until: string | null, info: string, img: string, link?: string };

export const experienceItems: Item[] = [
  { at: 'dec 2024', until: null, info: 'AWS Infrastructure Engineer and Java/NodeJS Backend Developer at Tikkie', img: 'tikkie' },
  { at: 'jul 2024', until: 'nov 2024', info: 'AWS Cloud Consultant at Holland Casino', img: 'holland-casino' },
  { at: 'may 2024', until: 'jun 2024', info: 'GCP Cloud Consultant at Kramp Group', img: 'kramp' },
  { at: 'apr 2023', until: 'jan 2024', info: 'AWS Cloud Consultant at ABN Amro Clearing', img: 'aacb' },
  { at: 'jun 2022', until: 'mar 2023', info: 'AWS Cloud Consultant at TuneIn', img: 'tunein' },
  { at: 'mar 2022', until: 'jun 2022', info: 'AWS Cloud Consultant at DPG Media', img: 'dpgmedia' },
  { at: 'okt 2021', until: 'mar 2022', info: 'GCP Cloud Consultant and CI/CD Engineer at Felyx', img: 'felyx' },
  { at: 'okt 2021', until: null, info: 'Cloud Consultant at Xebia Cloud', img: 'xebia' },
  { at: 'jun 2019', until: 'sep 2021', info: 'AWS Cloud and Java/NodeJS Backend Engineer at Tikkie', img: 'tikkie' },
  { at: 'dec 2018', until: 'may 2019', info: 'Software Engineer at ING', img: 'ing' },
  { at: 'sep 2018', until: 'sep 2021', info: 'Consultant at Quintor', img: 'quintor' },
  { at: 'sep 2016', until: 'sep 2017', info: 'Board Member at Study Association Sticky', img: 'svsticky' },
  { at: 'jun 2015', until: 'aug 2015', info: 'Game Programmer at Tingly Games', img: 'tingly' },
  { at: 'feb 2014', until: 'jun 2014', info: 'Internship at Tingly Games', img: 'tingly' },
  { at: 'apr 2012', until: 'jan 2013', info: 'Game Programmer at Sticky Studios', img: 'sticky' },
  { at: 'sep 2011', until: 'jan 2012', info: 'Internship at Sticky Studios', img: 'sticky' },
];

export const certificationsItems: Item[] = [
  { at: 'may 2023', until: null, info: 'Google Cloud - Associate Cloud Engineer', img: 'gcp',
    link: 'https://www.credential.net/a6a4376e-6287-4143-85d2-8def77aeeba0' },
  { at: 'feb 2020', until: 'feb 2023', info: 'AWS Certified Developer – Associate (91%)', img: 'aws',
    link: 'https://www.youracclaim.com/badges/d2aa10d7-988c-433a-870b-4d7a24c8c425' },
  { at: 'mar 2019', until: null, info: 'Certified Scrum Master (88%)', img: 'scrummaster' },
  { at: 'nov 2018', until: null, info: 'Oracle Certified Professional, Java SE 8 Programmer (88%)', img: 'java',
    link: 'https://www.youracclaim.com/badges/a8c2a7ea-743d-4e29-9692-790832764aac' },
  { at: 'nov 2018', until: null, info: 'Oracle Certified Associate, Java SE 8 Programmer (92%)', img: 'java',
    link: 'https://www.youracclaim.com/badges/80176e1b-f84f-4634-8564-c92136ac0dbb' },
];

export const languagesItems: Item[] = [
  { at: '2024', until: null, info: 'Java, Gradle, Spring and AWS SDK', img: 'idea' },
  { at: '2024', until: '2024', info: 'Python', img: 'python' },
  { at: '2023', until: '2023', info: 'Rust', img: 'rust' },
  { at: '2022', until: '2024', info: 'Terraform', img: 'terraform' },
  { at: '2022', until: '2023', info: 'Pulumi, Github Actions and Go', img: 'pulumi' },
  { at: '2021', until: null, info: 'TypeScript, React, Next, Netlify, Vercel, Krmx', img: 'react' },
  { at: '2021', until: '2022', info: 'Google Kubernetes Engine, Cloud Build, and Terraform', img: 'gke' },
  { at: '2021', until: '2021', info: 'React, Next, Styled Components, TypeScript, and Redux', img: 'react' },
  { at: '2020', until: null, info: 'TypeScript, AWS CDK, npm, and CloudFormation', img: 'aws-cdk' },
  { at: '2018', until: '2021', info: 'Vue, Nuxt, and TailwindCSS', img: 'vuejs' },
  { at: '2018', until: '2020', info: 'Serverless, JavaScript, Webpack, Jest, and CloudFormation', img: 'serverless' },
  { at: '2018', until: '2019', info: 'Java, Kotlin, Spring, Kafka, and Axon in Intellij IDEA', img: 'idea' },
  { at: '2014', until: '2019', info: 'HTML5, jQuery and Javascript in Visual Studio Code', img: 'html5' },
  { at: '2014', until: '2015', info: 'C++ in Visual Studio (GLUT, Bullet and OpenCV)', img: 'visualstudio' },
  { at: '2013', until: '2013', info: 'Java, JSP, Hibernate and Spring in NetBeans', img: 'spring' },
  { at: '2013', until: '2013', info: 'C++ in the Irrlicht Game Engine', img: 'cpp' },
  { at: '2011', until: '2018', info: 'C# in the Unity Game Engine', img: 'unity' },
  { at: '2011', until: '2017', info: 'PHP / MySQL in NotePad++', img: 'php' },
  { at: '2010', until: '2012', info: 'C# in Visual Studio using XNA', img: 'xna' },
  { at: '2010', until: '2011', info: 'Action Script 3.0 in FlashDevelop using Flixel', img: 'flixel' },
  { at: '2010', until: '2010', info: 'Java in NetBeans', img: 'netbeans' },
  { at: '2009', until: '2009', info: 'Visual Basic for Excel in Excel', img: 'vbexcel' },
  { at: '2003', until: '2009', info: 'Game Maker Language (GML) in Game Maker 7.0', img: 'gm7' },
];

export const toolsItems: Item[] = [
  { at: '2022', until: null, info: 'GitHub Actions', img: 'github-actions' },
  { at: '2021', until: null, info: 'Google Cloud Platform (GCP Cloud)', img: 'gcp' },
  { at: '2019', until: null, info: 'Amazon Web Services (AWS Cloud)', img: 'aws' },
  { at: '2019', until: '2023', info: 'Jira - Project Management', img: 'jira' },
  { at: '2018', until: '2021', info: 'Postman - API Development', img: 'postman' },
  { at: '2018', until: null, info: 'Linux / MacOS - ZSH, Bash, Ubuntu', img: 'linux' },
  { at: '2018', until: '2021', info: 'Jenkins, Fortify, and SonarQube', img: 'jenkins' },
  { at: '2012', until: null, info: 'Git on GitHub, BitBucket, and GitLab', img: 'git' },
  { at: '2012', until: '2018', info: 'TortoiseHg Mercurial on BitBucket.org', img: 'hg' },
  { at: '2011', until: '2012', info: 'TortoiseSVN SubVersion', img: 'svn' },
];

export const educationItems: Item[] = [
  { at: '2014', until: '2018', info: 'Utrecht University (UU) - Master, Game And Media Technology', img: 'uu' },
  { at: '2010', until: '2014', info: 'Hogeschool van Amsterdam (HvA) - Game Technology', img: 'hva' },
];
