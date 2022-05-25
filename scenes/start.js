import useScene from '../libs/redux/hooks/useScene';
import useMode from '../libs/redux/hooks/useMode';
import { NeonBox, NeonText } from '../components/neon';

const modes = [
  { key: 'management', text: '経営モード' },
  { key: 'free', text: 'フリープレイ' },
  { key: 'plane', text: '飛行機モード' },
  { key: 'train', text: '電車モード' },
  { key: 'bus', text: 'バスモード' },
  { key: 'ship', text: '船モード' },
];

const StartScene = () => {
  const { handler: setScene } = useScene();
  const { handler: setMode } = useMode();

  const startGame = (mode) => {
    setMode(mode);
    setScene('play');
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className='flex items-center pb-16'>
        <NeonText className='text-8xl text-blue-400'>Traffic Ltd.</NeonText>
      </div>
      <div className='grid grid-cols-2'>
        {modes.map((mode) => (
          <div
            className='mx-6 my-4 cursor-pointer'
            key={mode.key}
            onClick={() => startGame(mode.key)}
          >
            <NeonBox
              className='p-6 flex justify-center 
            text-xl font-bold hover:text-green-500'
            >
              {mode.text}
            </NeonBox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartScene
