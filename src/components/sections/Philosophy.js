import PhilosophyItem from './PhilosophyItem';

const philosophies = [
  { title: 'Driven by Intrigue', description: 'I take on work that inspires me and strive to create portfolio-worthy pieces.' },
  { title: 'Problem-Focused', description: 'I challenge assumptions to find the real problems worth solving.' },
  { title: 'Collaborative Inquiry', description: 'Asking questions is my responsibility – it’s how I bring value to clients.' },
];

function Philosophy() {
  return (
    <section id="philosophy">
      <h2>Philosophy</h2>
      {philosophies.map((item, index) => (
        <PhilosophyItem key={index} title={item.title} description={item.description} />
      ))}
    </section>
  );
}

export default Philosophy;