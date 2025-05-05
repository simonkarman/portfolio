import { use } from 'react';
import { PageProps } from '@/utils/page-props';

export default function Project(props: PageProps<{ name: string }>) {
  const params = use(props.params);
  return <pre>{params.name}</pre>;
}
