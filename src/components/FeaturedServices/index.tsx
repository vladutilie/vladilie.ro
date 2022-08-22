import { FeaturedServiceType } from '../../types/FeaturedService.type';
import { FeaturedService } from './FeaturedService';
import ContaDocs from '../../../public/assets/images/contadocs.png';
import GraphStars from '../../../public/assets/images/graphstars.png';

const services: FeaturedServiceType[] = [
  {
    image: ContaDocs,
    title: 'ContaDocs - Digitize accounting',
    url: 'https://contadocs.ro',
    description:
      'If you are an accountant this application can make your job easier. Just add companies you are doing accounting for in your dashboard and let your customers know the link where they can login with their phone number and upload their invoices and statements.'
  },
  {
    image: GraphStars,
    title: 'GraphStars - Neo4j Consulting Specialists',
    url: 'https://graphstars.com',
    description:
      "We assist in all stages of software development projects that employ or are considering using Neo4j. Whether you're just getting started and want to validate your graph model and software architecture, learn about graph database best practices, solve a real-world technical issue, boost performance, get some help transitioning into production, or obtain advice on long-term Neo4j database administration."
  }
];

export const FeaturedServices: React.FC = () => {
  return (
    <section className='flex flex-col gap-y-4'>
      <h3>Featured services</h3>

      <ul className='flex flex-col gap-y-4'>
        {services.map(({ image, title, url, description }: FeaturedServiceType, idx) => (
          <FeaturedService key={idx} image={image} title={title} url={url} description={description} />
        ))}
      </ul>
    </section>
  );
};
