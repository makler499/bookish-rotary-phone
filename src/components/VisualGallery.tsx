import { visualSources } from '../data/visuals';
import { SectionShell } from './SectionShell';

export function VisualGallery() {
  return (
    <SectionShell
      id="gallery"
      eyebrow="06 / визуальный портал"
      title="Фотографии и изображения"
      lead="Галерея собирает лица, сцены и метафоры разных эпох: от театральной маски и сатирической печати до кино и цифрового архива."
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
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
