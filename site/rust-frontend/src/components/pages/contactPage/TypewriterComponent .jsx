import Typewriter from 'typewriter-effect';

const TypewriterComponent = () => {
  useEffect(() => {
    new Typewriter('#typewriter', {
      strings: ['Welcome to Competitive Arena — your portal to the world of the best Rust servers!'],
      autoStart: true,
      loop: false,        
      deleteSpeed: 0,      
      delay: 30,         
    }).start();
  }, []);

  return (
    <p id="typewriter" style={{ fontSize: '2rem' }} />
  );
};

export default TypewriterComponent;
