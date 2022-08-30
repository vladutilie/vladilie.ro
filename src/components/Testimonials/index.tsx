import { Testimonial as TestimonialType } from '../../types/Testimonial.type';
import { Testimonial } from './Testimonial';

export const Testimonials: React.FC<{ testimonials: TestimonialType[] }> = ({ testimonials }) => {
  return (
    <>
      <h3>What others say about me</h3>

      <div className='flex flex-col gap-4 text-sm md:flex-row'>
        <div className='flex w-full flex-col gap-y-4 md:w-1/2'>
          {testimonials.map(
            (testimonial: TestimonialType, index: number) =>
              0 === index % 2 && <Testimonial key={index} {...testimonial} />
          )}
        </div>

        <div className='flex w-full flex-col gap-y-4 md:w-1/2'>
          {testimonials.map(
            (testimonial: TestimonialType, index: number) =>
              0 !== index % 2 && <Testimonial key={index} {...testimonial} />
          )}
        </div>
      </div>
    </>
  );
};
