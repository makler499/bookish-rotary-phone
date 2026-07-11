import { Image } from 'lucide-react';
import { visualSources } from '../data/visuals';
import { SectionShell } from './SectionShell';

export function VisualGallery() {
  return (
    <SectionShell
      id="gallery"
      eyebrow="06 / визуальный архив"
      title="Фотографии и изображения"
      lead="Новый визуальный слой связывает философов, психологов, кино и искусство с исследовательской линией сайта: от портрета и гравюры к экранному и музейному жесту."
    >
      <div className="visual-gallery">
        {visualSources.map((item, index) => (
          <figure className={index === 0 ? 'visual-card visual-card-featured' : 'visual-card'} key={item.title}>
            <div className="visual-image-wrap">
              <img src={item.image} alt={item.alt} loading="lazy" />
            </div>
            <figcaption>
              <p className="eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
              <span>
                <Image size={14} aria-hidden="true" />
                {item.source}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
