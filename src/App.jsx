import React, {useState} from 'react'
import Header from './Header.jsx'
import './index.css'

function App() {
  const [category, setCategory] = useState('Mountain');

  const images = {
    Mountain: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
      'https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg',
      'https://images.pexels.com/photos/675764/pexels-photo-675764.jpeg',
      'https://images.pexels.com/photos/2131899/pexels-photo-2131899.jpeg',
      'https://images.pexels.com/photos/18353685/pexels-photo-18353685/free-photo-of-nui-dan-ong-di-b-d-ng-dai-vach-da.jpeg',
      'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
      'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg',
      'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg',
      'https://images.pexels.com/photos/376368/pexels-photo-376368.jpeg'

    ],
    Beaches: [
      'https://images.pexels.com/photos/21787/pexels-photo.jpg',
      'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg',
      'https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg',
      'https://images.pexels.com/photos/414320/pexels-photo-414320.jpeg',
      'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg',
      'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg',
      'https://images.pexels.com/photos/37403/bora-bora-french-polynesia-sunset-ocean.jpg',
      'https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg',
      'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg'
    ],
    Birds: [
      'https://images.pexels.com/photos/736520/pexels-photo-736520.jpeg',
      'https://images.pexels.com/photos/459070/pexels-photo-459070.jpeg',
      'https://images.pexels.com/photos/33101/new-wing-emergency-at-the-moment.jpg',
      'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg',
      'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg',
      'https://images.pexels.com/photos/2474014/pexels-photo-2474014.jpeg',
      'https://images.pexels.com/photos/35803/robin-bird-on-branch-in-the-garden.jpg',
      'https://images.pexels.com/photos/1438130/pexels-photo-1438130.jpeg',
      'https://images.pexels.com/photos/1123767/pexels-photo-1123767.jpeg'
    ],
    Foods: [
      'https://images.pexels.com/photos/2220618/pexels-photo-2220618.jpeg',
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      'https://images.pexels.com/photos/95960/pexels-photo-95960.jpeg',
      'https://images.pexels.com/photos/1483769/pexels-photo-1483769.jpeg',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      'https://images.pexels.com/photos/1200667/pexels-photo-1200667.jpeg',
      'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg',
      'https://images.pexels.com/photos/45209/purple-grapes-vineyard-napa-valley-napa-vineyard-45209.jpeg',
      'https://images.pexels.com/photos/2531189/pexels-photo-2531189.jpeg'
    ]
  };

  return (
    <Header category={category} setCategory={setCategory} images={images} />
  );
}

export default App
