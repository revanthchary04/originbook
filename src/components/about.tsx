import React, { useEffect } from 'react';

const AboutSection: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('.karaoke-container') as HTMLElement | null;
    if (!container || container.dataset.processed) return;

    const wrapWords = (node: Node) => {
      if (node.nodeType === 3) {
        const words = node.textContent?.match(/\S+|\s+/g) || [];
        const fragment = document.createDocumentFragment();

        words.forEach((word) => {
          if (word.trim().length > 0) {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'k-word';
            fragment.appendChild(span);
          } else {
            fragment.appendChild(document.createTextNode(word));
          }
        });

        node.replaceWith(fragment);
      } else if (node.nodeType === 1) {
        Array.from(node.childNodes).forEach(wrapWords);
      }
    };

    Array.from(container.childNodes).forEach(wrapWords);
    container.dataset.processed = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = container.querySelectorAll('.k-word');

            words.forEach((word, index) => {
              setTimeout(() => {
                word.classList.add('active');
              }, index * 40);
            });

            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
  }, []);

  return (
    <section className="md:px-12 bg-black pt-32 pr-6 pb-32 pl-6">
      <div className="text-center max-w-5xl mr-auto ml-auto">
        <style>
          {`
            .k-word {
              opacity: 0.2;
              transition: opacity 0.25s ease;
              display: inline-block;
            }

            .k-word.active {
              opacity: 1;
            }
          `}
        </style>

        <h2 className="karaoke-container text-2xl md:text-4xl leading-relaxed font-medium text-white" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.06em' }}>
          We are a team of innovators and creators passionate about transforming the way you share content. Inspired by simplicity and functionality,
          we craft solutions that merge cutting-edge technology with user-friendly design to
          <span className="italic text-gray-400 font-serif" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25em', letterSpacing: '-0.06em' }}> inspire and engage</span>.
        </h2>

        <p className="text-xs text-gray-400 uppercase tracking-widest mt-12">
          Discover the Flippingbook Difference
        </p>
      </div>
    </section>
  );
};

export default AboutSection;