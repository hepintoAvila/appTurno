import beep from './beep.mp3';
export default function playSound(){
  const audio = new Audio(beep); // La ruta es relativa a la carpeta public
  audio.addEventListener('canplaythrough', () => {
    audio.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
  });
  audio.addEventListener('error', (error) => {
    console.error('Error loading sound:', error);
  });
};
